import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import { useCartStore } from '../stores/cart.store';

/**
 * Shared cart actions used by product cards. "Virtual buy now" adds the item
 * and jumps straight to the (clearly virtual) checkout.
 */
export function useVirtualBuy() {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const addToCart = useCallback((product: Product) => addItem(product), [addItem]);

  const virtualBuyNow = useCallback(
    (product: Product) => {
      addItem(product);
      navigate('/checkout');
    },
    [addItem, navigate],
  );

  return { addToCart, virtualBuyNow };
}
