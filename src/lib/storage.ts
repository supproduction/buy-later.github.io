/**
 * Small typed wrapper around localStorage.
 *
 * Persistence layer for the MVP — there is no backend. All data lives in the
 * browser. Reads are defensive: malformed JSON or an unavailable localStorage
 * (private mode, SSR, quota) never throws, it just falls back to the default.
 */

const APP_PREFIX = 'buylater:';

/** All keys the app owns, so clearAppData knows exactly what to remove. */
export const STORAGE_KEYS = {
  products: `${APP_PREFIX}products`,
  cart: `${APP_PREFIX}cart`,
  orders: `${APP_PREFIX}orders`,
  settings: `${APP_PREFIX}settings`,
  community: `${APP_PREFIX}community`,
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

function getStore(): Storage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    // Touch it to surface SecurityError in restricted contexts.
    const probe = '__buylater_probe__';
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function get<T>(key: StorageKey, fallback: T): T {
  const store = getStore();
  if (!store) return fallback;
  try {
    const raw = store.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    // Malformed JSON — drop it and return the fallback.
    return fallback;
  }
}

export function set<T>(key: StorageKey, value: T): void {
  const store = getStore();
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or serialization error — fail silently for the MVP.
  }
}

export function remove(key: StorageKey): void {
  const store = getStore();
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Wipe everything the app stored. Used by the "Clear all my data" control. */
export function clearAppData(): void {
  const store = getStore();
  if (!store) return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    try {
      store.removeItem(key);
    } catch {
      /* ignore */
    }
  });
}

export const storage = { get, set, remove, clearAppData, STORAGE_KEYS };
