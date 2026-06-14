import { describe, expect, it } from 'vitest';
import { mapDummyProduct } from './product-api';

describe('mapDummyProduct', () => {
  const base = {
    id: 7,
    title: 'Cool Item',
    description: '  spaced  ',
    price: 12.345,
    thumbnail: 'https://cdn.example/img.png',
    brand: 'Acme',
  };

  it('maps a known category and normalizes fields', () => {
    const product = mapDummyProduct({ ...base, category: 'smartphones' });
    expect(product).not.toBeNull();
    expect(product).toMatchObject({
      id: 'demo-dj-7',
      title: 'Cool Item',
      description: 'spaced',
      category: 'Tech',
      currency: 'EUR',
      source: 'demo',
      storeName: 'Acme',
      imageUrl: 'https://cdn.example/img.png',
    });
    expect(product!.price).toBeCloseTo(12.35, 2);
  });

  it('falls back to a generic store name when brand is missing', () => {
    const product = mapDummyProduct({ ...base, category: 'beauty', brand: undefined });
    expect(product!.storeName).toBe('Demo Marketplace');
    expect(product!.category).toBe('Beauty');
  });

  it('drops products in unmapped categories', () => {
    expect(mapDummyProduct({ ...base, category: 'mystery-box' })).toBeNull();
  });
});
