import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '../types/product';
import { STORAGE_KEYS } from '../lib/storage';
import { createId } from '../lib/ids';

/** A product the user is "watching" (subscribing to reconsider later). */
export interface WatchedItem {
  product: Product;
  addedAt: string;
}

/** A reflection the user added on a product (their own honest note). */
export interface UserReflection {
  id: string;
  text: string;
  /** Optional "I'd only consider it under €X" price the user would accept. */
  price?: number;
  createdAt: string;
}

interface CommunityState {
  watch: WatchedItem[];
  /** User reflections keyed by product id. */
  reflections: Record<string, UserReflection[]>;
  isWatching: (productId: string) => boolean;
  toggleWatch: (product: Product) => void;
  removeWatch: (productId: string) => void;
  addReflection: (productId: string, text: string, price?: number) => void;
  removeReflection: (productId: string, reflectionId: string) => void;
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      watch: [],
      reflections: {},
      isWatching: (productId) => get().watch.some((w) => w.product.id === productId),
      toggleWatch: (product) =>
        set((state) => {
          const exists = state.watch.some((w) => w.product.id === product.id);
          return {
            watch: exists
              ? state.watch.filter((w) => w.product.id !== product.id)
              : [{ product, addedAt: new Date().toISOString() }, ...state.watch],
          };
        }),
      removeWatch: (productId) =>
        set((state) => ({ watch: state.watch.filter((w) => w.product.id !== productId) })),
      addReflection: (productId, text, price) =>
        set((state) => {
          const reflection: UserReflection = {
            id: createId('reflection'),
            text: text.trim(),
            price,
            createdAt: new Date().toISOString(),
          };
          return {
            reflections: {
              ...state.reflections,
              [productId]: [reflection, ...(state.reflections[productId] ?? [])],
            },
          };
        }),
      removeReflection: (productId, reflectionId) =>
        set((state) => ({
          reflections: {
            ...state.reflections,
            [productId]: (state.reflections[productId] ?? []).filter(
              (r) => r.id !== reflectionId,
            ),
          },
        })),
    }),
    {
      name: STORAGE_KEYS.community,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function selectWatchCount(state: CommunityState): number {
  return state.watch.length;
}
