import type { CartItem } from './cart';

export type VirtualOrderStatus =
  | 'confirmed'
  | 'packed'
  | 'handed_to_virtual_courier'
  | 'in_transit'
  | 'virtually_delivered'
  | 'review_pending';

/** Ordered list of statuses, in the sequence they occur. */
export const ORDER_STATUS_SEQUENCE: VirtualOrderStatus[] = [
  'confirmed',
  'packed',
  'handed_to_virtual_courier',
  'in_transit',
  'virtually_delivered',
  'review_pending',
];

export const ORDER_STATUS_LABELS: Record<VirtualOrderStatus, string> = {
  confirmed: 'Confirmed',
  packed: 'Packed',
  handed_to_virtual_courier: 'Handed to virtual courier',
  in_transit: 'In transit',
  virtually_delivered: 'Virtually delivered',
  review_pending: 'Cooling-off review pending',
};

export type DeliveryVibe =
  | 'home_vibe'
  | 'office_vibe'
  | 'secret_base'
  | 'moon_station'
  | 'doesnt_matter';

export const DELIVERY_VIBES: { value: DeliveryVibe; label: string; emoji: string }[] = [
  { value: 'home_vibe', label: 'Home vibe', emoji: '🏡' },
  { value: 'office_vibe', label: 'Office vibe', emoji: '🏢' },
  { value: 'secret_base', label: 'Secret base', emoji: '🕵️' },
  { value: 'moon_station', label: 'Moon station', emoji: '🌙' },
  { value: 'doesnt_matter', label: "Doesn't matter", emoji: '🤷' },
];

export type OrderDecision = 'avoided' | 'maybe_later' | 'still_wanted';

export interface VirtualOrderStatusHistoryItem {
  status: VirtualOrderStatus;
  timestamp: string;
  label: string;
}

export interface VirtualOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  currency: string;
  deliveryVibe: DeliveryVibe;
  /** Coarse, user-entered delivery location for the simulated route. Optional. */
  deliveryCity?: string;
  deliveryCountry?: string;
  currentStatus: VirtualOrderStatus;
  statusHistory: VirtualOrderStatusHistoryItem[];
  coolingOffUntil: string;
  decision?: OrderDecision;
  /** Whether the simulated delivery runs in fast "demo mode". */
  demoMode: boolean;
}
