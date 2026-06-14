/**
 * Cloud sync between the local Zustand stores and Supabase.
 *
 * Offline-first: nothing here runs unless Supabase is configured AND a user is
 * signed in. On sign-in we reconcile once (seed cloud from local if the cloud is
 * empty, otherwise replace local with cloud), then debounce-push a full snapshot
 * on any store change. Single-user, last-write-wins — simple and robust for an MVP.
 */
import { supabase } from './supabase';
import type { Product } from '../types/product';
import type { VirtualOrder } from '../types/order';
import { useProductStore } from '../stores/product.store';
import { useOrderStore } from '../stores/order.store';
import {
  useCommunityStore,
  type UserReflection,
  type WatchedItem,
} from '../stores/community.store';

// Guard so the programmatic setState during reconcile doesn't echo back as a push.
let applyingRemote = false;

const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v) || 0);

/* ---------- mappers: store shape <-> DB row ---------- */

function productToRow(p: Product, userId: string) {
  return {
    id: p.id,
    user_id: userId,
    title: p.title,
    description: p.description ?? null,
    price: p.price,
    currency: p.currency,
    category: p.category,
    image_url: p.imageUrl ?? null,
    store_name: p.storeName ?? null,
    product_url: p.productUrl ?? null,
    tags: p.tags ?? null,
    rating: p.rating ?? null,
    original_price: p.originalPrice ?? null,
    source: p.source,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProduct(r: any): Product {
  return {
    id: r.id,
    title: r.title,
    description: r.description ?? '',
    price: num(r.price),
    currency: r.currency,
    category: r.category,
    imageUrl: r.image_url ?? undefined,
    storeName: r.store_name ?? undefined,
    productUrl: r.product_url ?? undefined,
    tags: r.tags ?? undefined,
    rating: r.rating != null ? num(r.rating) : undefined,
    originalPrice: r.original_price != null ? num(r.original_price) : undefined,
    source: r.source ?? 'manual',
  };
}

function orderToRow(o: VirtualOrder, userId: string) {
  return {
    id: o.id,
    user_id: userId,
    order_number: o.orderNumber,
    items: o.items,
    total: o.total,
    currency: o.currency,
    delivery_vibe: o.deliveryVibe ?? null,
    current_status: o.currentStatus,
    status_history: o.statusHistory,
    cooling_off_until: o.coolingOffUntil,
    decision: o.decision ?? null,
    decided_at: o.decidedAt ?? null,
    demo_mode: o.demoMode,
    created_at: o.createdAt,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToOrder(r: any): VirtualOrder {
  return {
    id: r.id,
    orderNumber: r.order_number,
    createdAt: r.created_at,
    items: r.items ?? [],
    total: num(r.total),
    currency: r.currency,
    deliveryVibe: r.delivery_vibe ?? 'doesnt_matter',
    currentStatus: r.current_status,
    statusHistory: r.status_history ?? [],
    coolingOffUntil: r.cooling_off_until,
    decision: r.decision ?? undefined,
    decidedAt: r.decided_at ?? undefined,
    demoMode: r.demo_mode ?? false,
  };
}

/* ---------- pull / push ---------- */

interface CloudSnapshot {
  products: Product[];
  orders: VirtualOrder[];
  watch: WatchedItem[];
  reflections: Record<string, UserReflection[]>;
}

async function pullAll(userId: string): Promise<CloudSnapshot> {
  const sb = supabase!;
  const [products, orders, watch, reflections] = await Promise.all([
    sb.from('products').select('*').eq('user_id', userId),
    sb.from('orders').select('*').eq('user_id', userId),
    sb.from('watchlist').select('*').eq('user_id', userId),
    sb.from('reflections').select('*').eq('user_id', userId),
  ]);

  const reflectionMap: Record<string, UserReflection[]> = {};
  for (const r of reflections.data ?? []) {
    (reflectionMap[r.product_id] ??= []).push({
      id: r.id,
      text: r.body,
      price: r.price != null ? num(r.price) : undefined,
      createdAt: r.created_at,
    });
  }

  const productList = (products.data ?? []).map(rowToProduct);
  const orderList = (orders.data ?? []).map(rowToOrder);
  const watchList: WatchedItem[] = (watch.data ?? []).map((w) => ({
    product: w.product,
    addedAt: w.added_at,
  }));

  return {
    products: productList,
    orders: orderList,
    watch: watchList,
    reflections: reflectionMap,
  };
}

/** Replace each table's rows with the current local snapshot (delete + insert). */
async function pushAll(userId: string): Promise<void> {
  const products = useProductStore.getState().customProducts;
  const orders = useOrderStore.getState().orders;
  const { watch, reflections } = useCommunityStore.getState();

  const reflectionRows = Object.entries(reflections).flatMap(([productId, list]) =>
    list.map((r) => ({
      id: r.id,
      user_id: userId,
      product_id: productId,
      body: r.text,
      price: r.price ?? null,
      created_at: r.createdAt,
    })),
  );

  try {
    await Promise.all([
      replaceTable('products', userId, products.map((p) => productToRow(p, userId))),
      replaceTable('orders', userId, orders.map((o) => orderToRow(o, userId))),
      replaceTable(
        'watchlist',
        userId,
        watch.map((w) => ({
          user_id: userId,
          product_id: w.product.id,
          product: w.product,
          added_at: w.addedAt,
        })),
      ),
      replaceTable('reflections', userId, reflectionRows),
    ]);
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[sync] push failed', err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function replaceTable(table: string, userId: string, rows: any[]): Promise<void> {
  const sb = supabase!;
  await sb.from(table).delete().eq('user_id', userId);
  if (rows.length > 0) await sb.from(table).insert(rows);
}

/* ---------- orchestration ---------- */

function nextSequenceFrom(orders: VirtualOrder[]): number {
  let max = 0;
  for (const o of orders) {
    const n = Number(o.orderNumber.split('-').pop());
    if (Number.isFinite(n)) max = Math.max(max, n);
  }
  return max;
}

/**
 * Load cloud data into the app on sign-in. The cloud is the source of truth:
 * the signed-in account's data replaces whatever is in this browser. Subsequent
 * local changes are pushed up by `subscribeSync`.
 */
export async function reconcile(userId: string): Promise<void> {
  if (!supabase) return;
  try {
    const cloud = await pullAll(userId);
    applyingRemote = true;
    useProductStore.setState({ customProducts: cloud.products });
    useOrderStore.setState({ orders: cloud.orders, sequence: nextSequenceFrom(cloud.orders) });
    useCommunityStore.setState({ watch: cloud.watch, reflections: cloud.reflections });
    applyingRemote = false;
  } catch (err) {
    applyingRemote = false;
    if (import.meta.env.DEV) console.warn('[sync] reconcile failed', err);
  }
}

/** Subscribe to store changes and debounce-push a full snapshot. Returns cleanup. */
export function subscribeSync(userId: string): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if (applyingRemote) return;
    clearTimeout(timer);
    timer = setTimeout(() => void pushAll(userId), 800);
  };
  const unsubs = [
    useProductStore.subscribe(schedule),
    useOrderStore.subscribe(schedule),
    useCommunityStore.subscribe(schedule),
  ];
  return () => {
    clearTimeout(timer);
    unsubs.forEach((u) => u());
  };
}
