import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '../types/product';
import { useCartStore, selectCartTotal, selectCartCount } from './cart.store';

function product(id: string, price: number): Product {
  return {
    id,
    title: `Item ${id}`,
    description: '',
    price,
    currency: 'EUR',
    category: 'Tech',
    source: 'demo',
  };
}

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('adds an item', () => {
    useCartStore.getState().addItem(product('a', 100));
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it('increments quantity when adding an existing item', () => {
    const { addItem } = useCartStore.getState();
    addItem(product('a', 100));
    addItem(product('a', 100), 2);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it('removes an item', () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(product('a', 100));
    addItem(product('b', 50));
    removeItem('a');
    expect(useCartStore.getState().items.map((i) => i.product.id)).toEqual(['b']);
  });

  it('updates quantity', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(product('a', 100));
    updateQuantity('a', 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes the line when quantity drops below 1', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(product('a', 100));
    updateQuantity('a', 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('calculates the total and count via selectors', () => {
    const { addItem } = useCartStore.getState();
    addItem(product('a', 100), 2); // 200
    addItem(product('b', 50)); // 50
    const state = useCartStore.getState();
    expect(selectCartTotal(state)).toBe(250);
    expect(selectCartCount(state)).toBe(3);
  });
});
