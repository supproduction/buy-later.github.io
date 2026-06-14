import { useEffect, useMemo } from 'react';
import { useProductStore, type RemoteStatus } from '../stores/product.store';
import { DEMO_PRODUCTS } from '../data/demo-products';
import type { Product } from '../types/product';

/**
 * The live DummyJSON catalog has no "Gaming" items, so the Gaming filter would
 * be empty. Top it up with the static Gaming demo products so every category
 * has something. (The full static list is used as-is in the offline fallback.)
 */
const GAMING_TOPUP = DEMO_PRODUCTS.filter((p) => p.category === 'Gaming');

export interface UseProductsResult {
  products: Product[];
  status: RemoteStatus;
  /** True while the live catalog is loading and nothing is shown yet. */
  isLoading: boolean;
  /** True when the live fetch failed and the static fallback is in use. */
  usingFallback: boolean;
}

/**
 * Catalog products: the user's own items first, then the live demo catalog
 * (DummyJSON), or the static fallback if the live fetch failed. Kicks off the
 * one-time remote load on mount.
 */
export function useProducts(): UseProductsResult {
  const customProducts = useProductStore((s) => s.customProducts);
  const remoteProducts = useProductStore((s) => s.remoteProducts);
  const status = useProductStore((s) => s.remoteStatus);
  const loadRemoteProducts = useProductStore((s) => s.loadRemoteProducts);

  useEffect(() => {
    loadRemoteProducts();
  }, [loadRemoteProducts]);

  const products = useMemo(() => {
    let base: Product[] = [];
    if (status === 'ready' && remoteProducts.length > 0) {
      // Live catalog + Gaming items it lacks.
      base = [...remoteProducts, ...GAMING_TOPUP];
    } else if (status === 'error') {
      // Offline fallback already includes Gaming.
      base = DEMO_PRODUCTS;
    }
    return [...customProducts, ...base];
  }, [customProducts, remoteProducts, status]);

  return {
    products,
    status,
    isLoading: status === 'idle' || status === 'loading',
    usingFallback: status === 'error',
  };
}
