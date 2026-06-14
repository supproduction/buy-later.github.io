/**
 * Pure order logic — kept out of the store so it can be unit-tested in isolation.
 *
 * IMPORTANT: this is a *simulation*. No payment, no real order, no shipping.
 * Status is derived purely from elapsed time since `createdAt`.
 */
import type { CartItem } from '../types/cart';
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_SEQUENCE,
  type DeliveryVibe,
  type VirtualOrder,
  type VirtualOrderStatus,
  type VirtualOrderStatusHistoryItem,
} from '../types/order';
import { addDays, DEFAULT_COOLING_OFF_DAYS } from './dates';
import { createId, createOrderNumber } from './ids';

/**
 * Status thresholds in seconds since creation.
 * Demo mode keeps the spec's seconds-based pacing; normal mode stretches the
 * same shape across hours so the cooling-off period stays meaningful.
 */
const TIMELINE_SECONDS = {
  demo: {
    packed: 30,
    handed_to_virtual_courier: 90,
    in_transit: 180,
    virtually_delivered: 300,
  },
  normal: {
    packed: 60 * 30, // 30 min
    handed_to_virtual_courier: 60 * 90, // 1.5 h
    in_transit: 60 * 60 * 4, // 4 h
    virtually_delivered: 60 * 60 * 12, // 12 h
  },
} as const;

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Compute the current delivery status from elapsed time.
 * Once the cooling-off window passes, the order moves to `review_pending`.
 */
export function computeStatusFromCreatedAt(
  createdAt: string,
  options: { demoMode: boolean; coolingOffUntil: string; now?: number },
): VirtualOrderStatus {
  const now = options.now ?? Date.now();

  if (now >= new Date(options.coolingOffUntil).getTime()) {
    return 'review_pending';
  }

  const elapsedSeconds = (now - new Date(createdAt).getTime()) / 1000;
  const t = options.demoMode ? TIMELINE_SECONDS.demo : TIMELINE_SECONDS.normal;

  if (elapsedSeconds >= t.virtually_delivered) return 'virtually_delivered';
  if (elapsedSeconds >= t.in_transit) return 'in_transit';
  if (elapsedSeconds >= t.handed_to_virtual_courier) return 'handed_to_virtual_courier';
  if (elapsedSeconds >= t.packed) return 'packed';
  return 'confirmed';
}

/** Index of a status within the canonical sequence. */
export function statusIndex(status: VirtualOrderStatus): number {
  return ORDER_STATUS_SEQUENCE.indexOf(status);
}

/**
 * Append any newly-reached statuses to the history, preserving existing
 * timestamps. Returns a new array (does not mutate the input).
 */
export function reconcileStatusHistory(
  history: VirtualOrderStatusHistoryItem[],
  currentStatus: VirtualOrderStatus,
  now: number = Date.now(),
): VirtualOrderStatusHistoryItem[] {
  const seen = new Set(history.map((h) => h.status));
  const next = [...history];
  const target = statusIndex(currentStatus);
  for (let i = 0; i <= target; i += 1) {
    const status = ORDER_STATUS_SEQUENCE[i];
    if (!seen.has(status)) {
      next.push({
        status,
        timestamp: new Date(now).toISOString(),
        label: ORDER_STATUS_LABELS[status],
      });
    }
  }
  return next;
}

export interface CreateOrderInput {
  items: CartItem[];
  deliveryVibe: DeliveryVibe;
  deliveryCity?: string;
  deliveryCountry?: string;
  currency: string;
  sequence: number;
  demoMode: boolean;
  now?: Date;
}

/** Build a fresh virtual order object. */
export function createVirtualOrder(input: CreateOrderInput): VirtualOrder {
  const now = input.now ?? new Date();
  const createdAt = now.toISOString();
  const coolingOffUntil = input.demoMode
    ? new Date(now.getTime() + 5 * 60 * 1000).toISOString() // 5 min in demo mode
    : addDays(createdAt, DEFAULT_COOLING_OFF_DAYS);

  return {
    id: createId('order'),
    orderNumber: createOrderNumber(input.sequence, now),
    createdAt,
    items: input.items,
    total: calculateTotal(input.items),
    currency: input.currency,
    deliveryVibe: input.deliveryVibe,
    deliveryCity: input.deliveryCity?.trim() || undefined,
    deliveryCountry: input.deliveryCountry?.trim() || undefined,
    currentStatus: 'confirmed',
    statusHistory: [
      {
        status: 'confirmed',
        timestamp: createdAt,
        label: ORDER_STATUS_LABELS.confirmed,
      },
    ],
    coolingOffUntil,
    demoMode: input.demoMode,
  };
}

/** Recompute a single order's status + history against the current time. */
export function refreshOrder(order: VirtualOrder, now: number = Date.now()): VirtualOrder {
  // A decided order is frozen — no further status progression.
  if (order.decision) return order;

  const currentStatus = computeStatusFromCreatedAt(order.createdAt, {
    demoMode: order.demoMode,
    coolingOffUntil: order.coolingOffUntil,
    now,
  });

  if (currentStatus === order.currentStatus) return order;

  return {
    ...order,
    currentStatus,
    statusHistory: reconcileStatusHistory(order.statusHistory, currentStatus, now),
  };
}
