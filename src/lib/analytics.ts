/**
 * Analytics-ready event utility.
 *
 * No third-party analytics are integrated in the MVP. Events are logged to the
 * console in development only, behind a stable `track()` API so a real sink can
 * be wired in later without touching call sites.
 */

export type AnalyticsEvent =
  | 'product_added'
  | 'virtual_order_created'
  | 'order_decision_avoided'
  | 'order_decision_still_wanted'
  | 'order_decision_maybe_later'
  | 'app_data_cleared';

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${event}`, payload ?? {});
  }
  // TODO: in production, forward to a privacy-respecting analytics sink.
}
