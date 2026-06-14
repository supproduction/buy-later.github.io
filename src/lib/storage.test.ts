import { beforeEach, describe, expect, it } from 'vitest';
import { get, set, remove, clearAppData, STORAGE_KEYS } from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the fallback when data is missing', () => {
    expect(get(STORAGE_KEYS.cart, { items: [] })).toEqual({ items: [] });
  });

  it('round-trips values through set/get', () => {
    set(STORAGE_KEYS.settings, { demoMode: true });
    expect(get(STORAGE_KEYS.settings, null)).toEqual({ demoMode: true });
  });

  it('returns the fallback when JSON is invalid', () => {
    localStorage.setItem(STORAGE_KEYS.orders, '{not valid json');
    expect(get(STORAGE_KEYS.orders, [])).toEqual([]);
  });

  it('removes a single key', () => {
    set(STORAGE_KEYS.cart, { items: [1] });
    remove(STORAGE_KEYS.cart);
    expect(get(STORAGE_KEYS.cart, null)).toBeNull();
  });

  it('clears all app data', () => {
    set(STORAGE_KEYS.cart, { items: [1] });
    set(STORAGE_KEYS.orders, [{ id: 'x' }]);
    clearAppData();
    expect(get(STORAGE_KEYS.cart, null)).toBeNull();
    expect(get(STORAGE_KEYS.orders, null)).toBeNull();
  });
});
