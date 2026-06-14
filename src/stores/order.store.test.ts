import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '../types/product';
import { useOrderStore, selectStats } from './order.store';

function items(price: number) {
  const product: Product = {
    id: 'a',
    title: 'Item',
    description: '',
    price,
    currency: 'EUR',
    category: 'Tech',
    source: 'demo',
  };
  return [{ product, quantity: 1 }];
}

describe('order store', () => {
  beforeEach(() => {
    useOrderStore.setState({ orders: [], sequence: 0 });
  });

  it('creates orders with incrementing order numbers', () => {
    const { createOrder } = useOrderStore.getState();
    const first = createOrder({ items: items(100), deliveryVibe: 'home_vibe', currency: 'EUR', demoMode: false });
    const second = createOrder({ items: items(100), deliveryVibe: 'home_vibe', currency: 'EUR', demoMode: false });
    expect(first.orderNumber).toBe('BL-2026-000001');
    expect(second.orderNumber).toBe('BL-2026-000002');
  });

  it('marks an order as avoided and counts it toward money saved', () => {
    const { createOrder, setDecision } = useOrderStore.getState();
    const order = createOrder({ items: items(120), deliveryVibe: 'home_vibe', currency: 'EUR', demoMode: false });
    setDecision(order.id, 'avoided');

    const stats = selectStats(useOrderStore.getState());
    expect(stats.totalSaved).toBe(120);
    expect(stats.purchasesAvoided).toBe(1);
    expect(stats.topCategoriesByAvoidedSpend[0]).toEqual({ category: 'Tech', amount: 120 });
  });

  it('does not count still-wanted orders as saved', () => {
    const { createOrder, setDecision } = useOrderStore.getState();
    const order = createOrder({ items: items(80), deliveryVibe: 'home_vibe', currency: 'EUR', demoMode: false });
    setDecision(order.id, 'still_wanted');

    const stats = selectStats(useOrderStore.getState());
    expect(stats.totalSaved).toBe(0);
    expect(stats.itemsStillWanted).toBe(1);
  });

  it('maybe_later leaves the order undecided and extends the review window', () => {
    const { createOrder, setDecision } = useOrderStore.getState();
    const order = createOrder({ items: items(80), deliveryVibe: 'home_vibe', currency: 'EUR', demoMode: false });
    const before = order.coolingOffUntil;
    setDecision(order.id, 'maybe_later');

    const updated = useOrderStore.getState().orders.find((o) => o.id === order.id)!;
    expect(updated.decision).toBeUndefined();
    expect(new Date(updated.coolingOffUntil).getTime()).toBeGreaterThanOrEqual(
      new Date(before).getTime(),
    );
  });
});
