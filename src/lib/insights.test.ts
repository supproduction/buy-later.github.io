import { describe, expect, it } from 'vitest';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';
import type { OrderDecision, VirtualOrder } from '../types/order';
import { DAY_MS } from './dates';
import {
  currentStreakDays,
  generateInsights,
  savingsByMonth,
  savingsInPeriods,
} from './insights';

const NOW = new Date('2026-06-14T12:00:00.000Z').getTime();

function product(category: Product['category'], price: number): Product {
  return {
    id: `p-${category}-${price}`,
    title: 't',
    description: '',
    price,
    currency: 'EUR',
    category,
    source: 'demo',
  };
}

function order(opts: {
  total: number;
  decision?: OrderDecision;
  agoDays: number;
  items?: CartItem[];
}): VirtualOrder {
  const ts = new Date(NOW - opts.agoDays * DAY_MS).toISOString();
  return {
    id: Math.random().toString(36),
    orderNumber: 'BL-2026-000001',
    createdAt: ts,
    items: opts.items ?? [{ product: product('Tech', opts.total), quantity: 1 }],
    total: opts.total,
    currency: 'EUR',
    deliveryVibe: 'home_vibe',
    currentStatus: 'review_pending',
    statusHistory: [],
    coolingOffUntil: ts,
    decision: opts.decision,
    decidedAt: opts.decision ? ts : undefined,
    demoMode: false,
  };
}

describe('savingsInPeriods', () => {
  it('buckets avoided savings by recency and ignores non-avoided', () => {
    const orders = [
      order({ total: 100, decision: 'avoided', agoDays: 1 }),
      order({ total: 50, decision: 'avoided', agoDays: 20 }),
      order({ total: 30, decision: 'avoided', agoDays: 200 }),
      order({ total: 999, decision: 'still_wanted', agoDays: 1 }),
      order({ total: 999, agoDays: 1 }), // undecided
    ];
    const s = savingsInPeriods(orders, NOW);
    expect(s.week).toBe(100);
    expect(s.month).toBe(150);
    expect(s.year).toBe(180);
  });
});

describe('savingsByMonth', () => {
  it('returns the requested number of months, oldest first', () => {
    const points = savingsByMonth([order({ total: 100, decision: 'avoided', agoDays: 0 })], 3, NOW);
    expect(points).toHaveLength(3);
    expect(points[2].amount).toBe(100); // current month is last
  });
});

describe('currentStreakDays', () => {
  it('is 0 with no orders', () => {
    expect(currentStreakDays([], NOW)).toBe(0);
  });

  it('counts from the last give-in (still_wanted)', () => {
    const orders = [
      order({ total: 100, decision: 'avoided', agoDays: 1 }),
      order({ total: 100, decision: 'still_wanted', agoDays: 5 }),
    ];
    expect(currentStreakDays(orders, NOW)).toBe(5);
  });

  it('counts from first order when never gave in', () => {
    const orders = [order({ total: 100, decision: 'avoided', agoDays: 10 })];
    expect(currentStreakDays(orders, NOW)).toBe(10);
  });
});

describe('generateInsights', () => {
  it('returns nothing without avoided orders', () => {
    expect(generateInsights([order({ total: 100, agoDays: 1 })], NOW)).toEqual([]);
  });

  it('surfaces a top avoided category', () => {
    const orders = [
      order({ total: 200, decision: 'avoided', agoDays: 1, items: [{ product: product('Tech', 200), quantity: 1 }] }),
      order({ total: 50, decision: 'avoided', agoDays: 2, items: [{ product: product('Tech', 50), quantity: 1 }] }),
    ];
    const keys = generateInsights(orders, NOW).map((i) => i.key);
    expect(keys).toContain('insights.topCategory');
    expect(keys).toContain('insights.categoryShare');
  });
});
