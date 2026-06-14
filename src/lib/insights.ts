/**
 * Pure analytics for the mindful-spending dashboard. No AI — simple
 * derivations from the order history. Kept out of the store for unit testing.
 *
 * "Savings" only ever counts orders the user decided NOT to buy (`avoided`),
 * bucketed by `decidedAt` (falls back to `createdAt` for older orders).
 */
import type { VirtualOrder } from '../types/order';
import { DAY_MS } from './dates';

function decisionTime(order: VirtualOrder): number {
  return new Date(order.decidedAt ?? order.createdAt).getTime();
}

function avoidedOrders(orders: VirtualOrder[]): VirtualOrder[] {
  return orders.filter((o) => o.decision === 'avoided');
}

export interface PeriodSavings {
  week: number;
  month: number;
  year: number;
}

/** Money saved within the trailing 7 / 30 / 365 days. */
export function savingsInPeriods(orders: VirtualOrder[], now = Date.now()): PeriodSavings {
  const out: PeriodSavings = { week: 0, month: 0, year: 0 };
  for (const o of avoidedOrders(orders)) {
    const age = now - decisionTime(o);
    if (age <= 7 * DAY_MS) out.week += o.total;
    if (age <= 30 * DAY_MS) out.month += o.total;
    if (age <= 365 * DAY_MS) out.year += o.total;
  }
  return out;
}

export interface MonthlyPoint {
  /** Month key like "2026-06". */
  key: string;
  amount: number;
}

/** Saved-amount per calendar month for the trailing `months` (oldest first). */
export function savingsByMonth(
  orders: VirtualOrder[],
  months = 6,
  now = Date.now(),
): MonthlyPoint[] {
  const points: MonthlyPoint[] = [];
  const base = new Date(now);
  for (let i = months - 1; i >= 0; i -= 1) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    points.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, amount: 0 });
  }
  const index = new Map(points.map((p, i) => [p.key, i]));
  for (const o of avoidedOrders(orders)) {
    const d = new Date(decisionTime(o));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const i = index.get(key);
    if (i != null) points[i].amount += o.total;
  }
  return points;
}

/**
 * Consecutive days "without an impulse purchase" — i.e. since the most recent
 * `still_wanted` decision (the moments the user gave in). If they never gave in,
 * counts from their first order. 0 if no orders.
 */
export function currentStreakDays(orders: VirtualOrder[], now = Date.now()): number {
  if (orders.length === 0) return 0;
  const gaveIn = orders
    .filter((o) => o.decision === 'still_wanted')
    .map((o) => decisionTime(o));
  const since = gaveIn.length > 0
    ? Math.max(...gaveIn)
    : Math.min(...orders.map((o) => new Date(o.createdAt).getTime()));
  return Math.max(0, Math.floor((now - since) / DAY_MS));
}

/** Milestone thresholds for the streak system. */
export const STREAK_MILESTONES = [3, 7, 30, 90] as const;

export interface Insight {
  key: string;
  params?: Record<string, string | number>;
}

/** Generate up to a few human insights from the data. */
export function generateInsights(orders: VirtualOrder[], now = Date.now()): Insight[] {
  const avoided = avoidedOrders(orders);
  if (avoided.length === 0) return [];

  const insights: Insight[] = [];

  // Category counts + spend.
  const countByCat = new Map<string, number>();
  const spendByCat = new Map<string, number>();
  let totalAvoidedSpend = 0;
  for (const o of avoided) {
    for (const item of o.items) {
      const amount = item.product.price * item.quantity;
      countByCat.set(item.product.category, (countByCat.get(item.product.category) ?? 0) + 1);
      spendByCat.set(item.product.category, (spendByCat.get(item.product.category) ?? 0) + amount);
      totalAvoidedSpend += amount;
    }
  }

  const topByCount = [...countByCat.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topByCount) insights.push({ key: 'insights.topCategory', params: { category: topByCount[0] } });

  const topBySpend = [...spendByCat.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topBySpend && totalAvoidedSpend > 0) {
    const pct = Math.round((topBySpend[1] / totalAvoidedSpend) * 100);
    insights.push({ key: 'insights.categoryShare', params: { pct, category: topBySpend[0] } });
  }

  // Month over month.
  const months = savingsByMonth(orders, 2, now);
  if (months.length === 2) {
    const [prev, curr] = months;
    if (curr.amount > prev.amount && curr.amount > 0) {
      insights.push({ key: 'insights.savedMoreThisMonth' });
    } else if (prev.amount > curr.amount && prev.amount > 0) {
      insights.push({ key: 'insights.savedLessThisMonth' });
    }
  }

  // Weekend pattern.
  let weekend = 0;
  for (const o of avoided) {
    const day = new Date(decisionTime(o)).getDay(); // 0 Sun … 6 Sat
    if (day === 0 || day === 6) weekend += 1;
  }
  if (avoided.length >= 3 && weekend / avoided.length > 0.5) {
    insights.push({ key: 'insights.weekendPattern' });
  }

  return insights.slice(0, 4);
}
