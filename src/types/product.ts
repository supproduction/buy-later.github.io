export type ProductCategory =
  | 'Tech'
  | 'Fashion'
  | 'Home'
  | 'Fitness'
  | 'Beauty'
  | 'Gaming';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Tech',
  'Fashion',
  'Home',
  'Fitness',
  'Beauty',
  'Gaming',
];

export type ProductSource = 'demo' | 'manual';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  imageUrl?: string;
  storeName?: string;
  productUrl?: string;
  tags?: string[];
  source: ProductSource;
  /** Average rating 0–5 (from the mock catalog). Informational only. */
  rating?: number;
  /**
   * Reference "typical retail" price, shown struck-through for context.
   * NOT a limited-time discount — purely informational, never urgency.
   */
  originalPrice?: number;
}
