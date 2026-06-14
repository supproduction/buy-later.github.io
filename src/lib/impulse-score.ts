/**
 * Impulse Score (0–100) — a lightweight heuristic, NOT AI.
 *
 * The score estimates how "impulse-prone" an item is, so users can spot the
 * purchases most worth pausing on. Higher = more impulsive.
 *
 * Heuristic inputs (MVP):
 * - Price: pricier items skew higher (more worth a cooling-off pause).
 * - Category: discretionary categories (Fashion, Gaming, Beauty) skew higher;
 *   practical ones (Home, Fitness) skew lower.
 * - A small deterministic per-item variance so identical inputs aren't flat.
 */
import type { Product, ProductCategory } from '../types/product';
import { hashString } from './community';

const CATEGORY_WEIGHT: Record<ProductCategory, number> = {
  Fashion: 30,
  Gaming: 30,
  Beauty: 26,
  Tech: 22,
  Fitness: 12,
  Home: 8,
};

export type ImpulseBand = 'low' | 'medium' | 'high';

export function impulseScore(product: Pick<Product, 'id' | 'price' | 'category'>): number {
  // Price component: saturates around €600 → up to 52 points.
  const priceScore = Math.min(52, (product.price / 600) * 52);
  const categoryScore = CATEGORY_WEIGHT[product.category] ?? 15;
  // Deterministic 0–9 variance from the id so scores aren't identical.
  const variance = hashString(`impulse:${product.id}`) % 10;
  return Math.max(0, Math.min(100, Math.round(priceScore + categoryScore + variance)));
}

export function impulseBand(score: number): ImpulseBand {
  if (score <= 30) return 'low';
  if (score <= 70) return 'medium';
  return 'high';
}
