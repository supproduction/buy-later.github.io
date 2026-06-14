import { describe, expect, it } from 'vitest';
import type { Product } from '../types/product';
import { impulseBand, impulseScore } from './impulse-score';

function p(overrides: Partial<Product>): Product {
  return {
    id: 'x',
    title: 't',
    description: '',
    price: 100,
    currency: 'EUR',
    category: 'Home',
    source: 'demo',
    ...overrides,
  };
}

describe('impulseScore', () => {
  it('returns a 0–100 value', () => {
    const s = impulseScore(p({ id: 'a', price: 200, category: 'Tech' }));
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(100);
  });

  it('scores discretionary categories higher than practical ones at equal price', () => {
    const fashion = impulseScore(p({ id: 'same', price: 100, category: 'Fashion' }));
    const home = impulseScore(p({ id: 'same', price: 100, category: 'Home' }));
    expect(fashion).toBeGreaterThan(home);
  });

  it('scores pricier items higher within the same category', () => {
    const cheap = impulseScore(p({ id: 'same', price: 20, category: 'Tech' }));
    const dear = impulseScore(p({ id: 'same', price: 500, category: 'Tech' }));
    expect(dear).toBeGreaterThan(cheap);
  });

  it('is deterministic for the same product', () => {
    const a = impulseScore(p({ id: 'k', price: 80, category: 'Beauty' }));
    const b = impulseScore(p({ id: 'k', price: 80, category: 'Beauty' }));
    expect(a).toBe(b);
  });
});

describe('impulseBand', () => {
  it('maps to low / medium / high', () => {
    expect(impulseBand(10)).toBe('low');
    expect(impulseBand(30)).toBe('low');
    expect(impulseBand(31)).toBe('medium');
    expect(impulseBand(70)).toBe('medium');
    expect(impulseBand(71)).toBe('high');
    expect(impulseBand(100)).toBe('high');
  });
});
