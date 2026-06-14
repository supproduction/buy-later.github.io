import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '../types/cart';
import type { DeliveryVibe, OrderDecision, VirtualOrder } from '../types/order';
import type { AppStats } from '../types/stats';
import { STORAGE_KEYS } from '../lib/storage';
import { addDays, DEFAULT_COOLING_OFF_DAYS } from '../lib/dates';
import { createVirtualOrder, refreshOrder } from '../lib/order';
import { track } from '../lib/analytics';

interface CreateOrderArgs {
  items: CartItem[];
  deliveryVibe: DeliveryVibe;
  currency: string;
  demoMode: boolean;
}

interface OrderState {
  orders: VirtualOrder[];
  /** Monotonic counter that drives human-readable order numbers. */
  sequence: number;
  createOrder: (args: CreateOrderArgs) => VirtualOrder;
  /** Recompute every order's simulated status against the current clock. */
  refreshStatuses: () => void;
  setDecision: (orderId: string, decision: OrderDecision) => void;
  getById: (orderId: string) => VirtualOrder | undefined;
  clearAll: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      sequence: 0,
      createOrder: ({ items, deliveryVibe, currency, demoMode }) => {
        const nextSequence = get().sequence + 1;
        const order = createVirtualOrder({
          items,
          deliveryVibe,
          currency,
          sequence: nextSequence,
          demoMode,
        });
        set((state) => ({
          orders: [order, ...state.orders],
          sequence: nextSequence,
        }));
        track('virtual_order_created', {
          orderNumber: order.orderNumber,
          total: order.total,
          itemCount: items.length,
        });
        return order;
      },
      refreshStatuses: () => {
        const now = Date.now();
        let changed = false;
        const next = get().orders.map((order) => {
          const refreshed = refreshOrder(order, now);
          if (refreshed !== order) changed = true;
          return refreshed;
        });
        if (changed) set({ orders: next });
      },
      setDecision: (orderId, decision) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order;
            if (decision === 'maybe_later') {
              // No final decision recorded — just push the review window out.
              return {
                ...order,
                coolingOffUntil: addDays(
                  new Date().toISOString(),
                  DEFAULT_COOLING_OFF_DAYS,
                ),
                decision: undefined,
              };
            }
            return { ...order, decision };
          }),
        }));

        if (decision === 'avoided') track('order_decision_avoided', { orderId });
        else if (decision === 'still_wanted')
          track('order_decision_still_wanted', { orderId });
        else track('order_decision_maybe_later', { orderId });
      },
      getById: (orderId) => get().orders.find((o) => o.id === orderId),
      clearAll: () => set({ orders: [], sequence: 0 }),
    }),
    {
      name: STORAGE_KEYS.orders,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Derive the stats dashboard numbers from the order list. */
export function selectStats(state: OrderState): AppStats {
  const { orders } = state;
  const currency = orders[0]?.currency ?? 'EUR';

  let totalVirtuallySpent = 0;
  let totalSaved = 0;
  let purchasesAvoided = 0;
  let itemsStillWanted = 0;
  let itemsMaybeLater = 0;
  const categoryMap = new Map<string, number>();

  for (const order of orders) {
    totalVirtuallySpent += order.total;

    if (order.decision === 'avoided') {
      // Money saved only counts orders the user decided NOT to buy.
      totalSaved += order.total;
      purchasesAvoided += 1;
      for (const item of order.items) {
        const amount = item.product.price * item.quantity;
        categoryMap.set(
          item.product.category,
          (categoryMap.get(item.product.category) ?? 0) + amount,
        );
      }
    } else if (order.decision === 'still_wanted') {
      itemsStillWanted += 1;
    } else if (!order.decision) {
      // Undecided orders sit in the "paused / maybe later" bucket.
      itemsMaybeLater += 1;
    }
  }

  const topCategoriesByAvoidedSpend = [...categoryMap.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return {
    totalOrders: orders.length,
    totalVirtuallySpent,
    totalSaved,
    purchasesAvoided,
    itemsStillWanted,
    itemsMaybeLater,
    topCategoriesByAvoidedSpend,
    currency,
  };
}
