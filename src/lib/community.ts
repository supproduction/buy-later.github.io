/**
 * Simulated, MINDFUL community layer.
 *
 * There is no backend. Every "community" number, reflection, and seller city is
 * derived deterministically from the product id (a stable hash), so it doesn't
 * flicker between renders and isn't random noise. It is ALWAYS presented as
 * simulated sample data, and it is deliberately reframed away from FOMO:
 * instead of "N people want this", we surface "N people are reconsidering this"
 * and reflections about waiting / skipping — reinforcing the cooling-off goal.
 */
import { KNOWN_CITIES, type CityEntry } from '../data/locations';

/** Stable 32-bit FNV-1a hash. */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const COUNTRY_FLAG: Record<string, string> = {
  Portugal: '🇵🇹',
  Spain: '🇪🇸',
  France: '🇫🇷',
  Germany: '🇩🇪',
  'United Kingdom': '🇬🇧',
  Poland: '🇵🇱',
  Netherlands: '🇳🇱',
  Italy: '🇮🇹',
};

export function flagFor(country: string): string {
  return COUNTRY_FLAG[country] ?? '🌍';
}

/** Deterministic "ships from" city for a product (from our known-city set). */
export function sellerCityFor(productId: string): CityEntry {
  return KNOWN_CITIES[hashString(`seller:${productId}`) % KNOWN_CITIES.length];
}

/** Deterministic count of people "reconsidering" (cooling off on) a product. */
export function reconsiderCountFor(productId: string): number {
  return 4 + (hashString(`cool:${productId}`) % 137); // 4–140
}

/** Reflection template keys — resolved via i18n `community.reflect.*`. */
export const REFLECTION_KEYS = [
  'waited',
  'skipped',
  'underprice',
  'already',
  'sleptOn',
] as const;
export type ReflectionKey = (typeof REFLECTION_KEYS)[number];

export interface SampleReflection {
  id: string;
  key: ReflectionKey;
  days: number;
  /** Present only for the "underprice" template. */
  price?: number;
}

/** Deterministic set of 2–4 sample reflections for a product. */
export function sampleReflectionsFor(productId: string, price: number): SampleReflection[] {
  const count = 2 + (hashString(`rc:${productId}`) % 3); // 2–4
  const out: SampleReflection[] = [];
  for (let i = 0; i < count; i += 1) {
    const h = hashString(`r:${productId}:${i}`);
    const key = REFLECTION_KEYS[h % REFLECTION_KEYS.length];
    const days = 1 + ((h >>> 3) % 14);
    const refPrice = key === 'underprice' ? Math.max(1, Math.round(price * 0.6)) : undefined;
    out.push({ id: `${productId}-${i}`, key, days, price: refPrice });
  }
  return out;
}
