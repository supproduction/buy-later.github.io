import { describe, expect, it } from 'vitest';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';
import {
  calculateTotal,
  computeStatusFromCreatedAt,
  createVirtualOrder,
  reconcileStatusHistory,
  refreshOrder,
} from './order';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p1',
    title: 'Test item',
    description: 'desc',
    price: 100,
    currency: 'EUR',
    category: 'Tech',
    source: 'demo',
    ...overrides,
  };
}

function makeItems(): CartItem[] {
  return [
    { product: makeProduct({ id: 'a', price: 100 }), quantity: 2 },
    { product: makeProduct({ id: 'b', price: 50 }), quantity: 1 },
  ];
}

describe('calculateTotal', () => {
  it('sums price * quantity across items', () => {
    expect(calculateTotal(makeItems())).toBe(250);
  });

  it('is zero for an empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });
});

describe('createVirtualOrder', () => {
  it('creates a confirmed order with a formatted order number', () => {
    const now = new Date('2026-06-14T10:00:00.000Z');
    const order = createVirtualOrder({
      items: makeItems(),
      deliveryVibe: 'moon_station',
      currency: 'EUR',
      sequence: 1,
      demoMode: false,
      now,
    });

    expect(order.orderNumber).toBe('BL-2026-000001');
    expect(order.currentStatus).toBe('confirmed');
    expect(order.total).toBe(250);
    expect(order.statusHistory).toHaveLength(1);
    expect(order.statusHistory[0].status).toBe('confirmed');
    expect(order.decision).toBeUndefined();
  });

  it('shortens the cooling-off window in demo mode', () => {
    const now = new Date('2026-06-14T10:00:00.000Z');
    const demo = createVirtualOrder({
      items: makeItems(),
      deliveryVibe: 'home_vibe',
      currency: 'EUR',
      sequence: 2,
      demoMode: true,
      now,
    });
    // 5 minutes in demo mode.
    expect(new Date(demo.coolingOffUntil).getTime() - now.getTime()).toBe(5 * 60 * 1000);
  });
});

describe('computeStatusFromCreatedAt (demo mode pacing)', () => {
  const createdAt = '2026-06-14T10:00:00.000Z';
  const base = new Date(createdAt).getTime();
  const coolingOffUntil = new Date(base + 60 * 60 * 1000).toISOString();
  const opts = { demoMode: true, coolingOffUntil };

  it('is confirmed at 0s', () => {
    expect(computeStatusFromCreatedAt(createdAt, { ...opts, now: base })).toBe('confirmed');
  });
  it('is packed after 30s', () => {
    expect(computeStatusFromCreatedAt(createdAt, { ...opts, now: base + 31_000 })).toBe(
      'packed',
    );
  });
  it('is handed to courier after 90s', () => {
    expect(computeStatusFromCreatedAt(createdAt, { ...opts, now: base + 91_000 })).toBe(
      'handed_to_virtual_courier',
    );
  });
  it('is in transit after 180s', () => {
    expect(computeStatusFromCreatedAt(createdAt, { ...opts, now: base + 181_000 })).toBe(
      'in_transit',
    );
  });
  it('is virtually delivered after 300s', () => {
    expect(computeStatusFromCreatedAt(createdAt, { ...opts, now: base + 301_000 })).toBe(
      'virtually_delivered',
    );
  });
  it('moves to review_pending once cooling-off passes', () => {
    const now = new Date(coolingOffUntil).getTime() + 1000;
    expect(computeStatusFromCreatedAt(createdAt, { ...opts, now })).toBe('review_pending');
  });
});

describe('reconcileStatusHistory', () => {
  it('backfills skipped statuses up to the current one', () => {
    const history = reconcileStatusHistory(
      [{ status: 'confirmed', timestamp: '...', label: 'Confirmed' }],
      'in_transit',
    );
    expect(history.map((h) => h.status)).toEqual([
      'confirmed',
      'packed',
      'handed_to_virtual_courier',
      'in_transit',
    ]);
  });
});

describe('refreshOrder', () => {
  it('advances status as time passes', () => {
    const now = new Date('2026-06-14T10:00:00.000Z');
    const order = createVirtualOrder({
      items: makeItems(),
      deliveryVibe: 'home_vibe',
      currency: 'EUR',
      sequence: 1,
      demoMode: true,
      now,
    });
    const later = refreshOrder(order, now.getTime() + 200_000);
    expect(later.currentStatus).toBe('in_transit');
    expect(later.statusHistory.length).toBeGreaterThan(1);
  });

  it('freezes a decided order', () => {
    const now = new Date('2026-06-14T10:00:00.000Z');
    const order = {
      ...createVirtualOrder({
        items: makeItems(),
        deliveryVibe: 'home_vibe',
        currency: 'EUR',
        sequence: 1,
        demoMode: true,
        now,
      }),
      decision: 'avoided' as const,
    };
    const later = refreshOrder(order, now.getTime() + 10_000_000);
    expect(later).toBe(order);
    expect(later.currentStatus).toBe('confirmed');
  });
});
