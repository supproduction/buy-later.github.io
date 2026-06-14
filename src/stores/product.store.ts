import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '../types/product';
import { DEMO_PRODUCTS } from '../data/demo-products';
import { STORAGE_KEYS } from '../lib/storage';
import { createId } from '../lib/ids';
import { track } from '../lib/analytics';
import { fetchRemoteProducts } from '../lib/product-api';

export interface NewProductInput {
  title: string;
  price: number;
  currency?: string;
  storeName?: string;
  productUrl?: string;
  imageUrl?: string;
  category: Product['category'];
  description?: string;
  tags?: string[];
}

export type RemoteStatus = 'idle' | 'loading' | 'ready' | 'error';

interface ProductState {
  /** User-added products only. Demo/remote products are not persisted here. */
  customProducts: Product[];
  /** Live demo catalog fetched from DummyJSON (not persisted — re-fetched each session). */
  remoteProducts: Product[];
  remoteStatus: RemoteStatus;
  addProduct: (input: NewProductInput) => Product;
  removeProduct: (id: string) => void;
  /** Fetch the live demo catalog once per session; falls back silently on error. */
  loadRemoteProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      customProducts: [],
      remoteProducts: [],
      remoteStatus: 'idle',
      addProduct: (input) => {
        const product: Product = {
          id: createId('product'),
          title: input.title.trim(),
          description: input.description?.trim() || 'Manually added item.',
          price: input.price,
          currency: input.currency ?? 'EUR',
          category: input.category,
          imageUrl: input.imageUrl?.trim() || undefined,
          storeName: input.storeName?.trim() || undefined,
          productUrl: input.productUrl?.trim() || undefined,
          tags: input.tags,
          source: 'manual',
        };
        set((state) => ({ customProducts: [product, ...state.customProducts] }));
        track('product_added', { id: product.id, category: product.category });
        return product;
      },
      removeProduct: (id) =>
        set((state) => ({
          customProducts: state.customProducts.filter((p) => p.id !== id),
        })),
      loadRemoteProducts: async () => {
        const { remoteStatus } = get();
        // Only fetch once per session.
        if (remoteStatus === 'loading' || remoteStatus === 'ready') return;
        set({ remoteStatus: 'loading' });
        try {
          const products = await fetchRemoteProducts();
          set({ remoteProducts: products, remoteStatus: 'ready' });
        } catch {
          // Offline/blocked — the catalog falls back to the static demo list.
          set({ remoteStatus: 'error' });
        }
      },
    }),
    {
      name: STORAGE_KEYS.products,
      storage: createJSONStorage(() => localStorage),
      // Persist only the user's own items; remote catalog is transient.
      partialize: (state) => ({ customProducts: state.customProducts }),
    },
  ),
);

/**
 * Base demo catalog for the current state: live remote products when available,
 * otherwise the static offline fallback.
 */
export function selectBaseProducts(state: ProductState): Product[] {
  if (state.remoteStatus === 'ready' && state.remoteProducts.length > 0) {
    return state.remoteProducts;
  }
  if (state.remoteStatus === 'error') return DEMO_PRODUCTS;
  return [];
}
