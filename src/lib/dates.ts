/** Date helpers for cooling-off windows and relative time copy. */

export const DAY_MS = 24 * 60 * 60 * 1000;

/** Default cooling-off window for the MVP. */
export const DEFAULT_COOLING_OFF_DAYS = 7;

export function addDays(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * DAY_MS).toISOString();
}

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() <= Date.now();
}

export function formatDate(iso: string, locale?: string): string {
  try {
    return new Date(iso).toLocaleString(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

/**
 * Human-friendly, locale-aware countdown, e.g. "in 6 days" / "in 6 Tagen".
 * Uses Intl.RelativeTimeFormat so it localizes automatically.
 */
export function timeUntil(iso: string, locale?: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  if (diff <= 0) return rtf.format(0, 'day'); // "today" / "heute" / "hoje"
  const days = Math.floor(diff / DAY_MS);
  if (days >= 1) return rtf.format(days, 'day');
  const hours = Math.floor(diff / (60 * 60 * 1000));
  if (hours >= 1) return rtf.format(hours, 'hour');
  const minutes = Math.max(1, Math.floor(diff / (60 * 1000)));
  return rtf.format(minutes, 'minute');
}
