/** ID and order-number generation. */

/** Random unique id, using crypto.randomUUID when available. */
export function createId(prefix = 'id'): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return `${prefix}_${crypto.randomUUID()}`;
    }
  } catch {
    /* fall through */
  }
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/**
 * Human-readable virtual order number, e.g. "BL-2026-000001".
 * `sequence` is a monotonically increasing counter the order store maintains.
 */
export function createOrderNumber(sequence: number, date = new Date()): string {
  const year = date.getFullYear();
  const padded = String(sequence).padStart(6, '0');
  return `BL-${year}-${padded}`;
}
