/**
 * Live demo catalog source.
 *
 * Products are fetched at runtime from DummyJSON (https://dummyjson.com) — a
 * free, public *mock* e-commerce dataset with real hosted product images. This
 * is NOT scraping a real shop: it's a sandbox dataset built for prototypes.
 * If the request fails (offline, blocked), the app falls back to the static
 * list in `data/demo-products.ts`.
 *
 * Note on positioning: DummyJSON titles may include real brand names. BuyLater
 * remains transparent that nothing here is for sale and no brand is affiliated.
 */
import type { Product, ProductCategory } from '../types/product';

/** Subset of the DummyJSON product shape we request via `select`. */
interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
  brand?: string;
  rating?: number;
  discountPercentage?: number;
}

/** Map DummyJSON's many categories onto our six. Unmapped ones are dropped. */
const CATEGORY_MAP: Record<string, ProductCategory> = {
  laptops: 'Tech',
  smartphones: 'Tech',
  tablets: 'Tech',
  'mobile-accessories': 'Tech',
  'mens-watches': 'Tech',
  'womens-watches': 'Tech',
  'mens-shirts': 'Fashion',
  'mens-shoes': 'Fashion',
  tops: 'Fashion',
  'womens-dresses': 'Fashion',
  'womens-shoes': 'Fashion',
  'womens-bags': 'Fashion',
  'womens-jewellery': 'Fashion',
  sunglasses: 'Fashion',
  furniture: 'Home',
  'home-decoration': 'Home',
  'kitchen-accessories': 'Home',
  groceries: 'Home',
  'sports-accessories': 'Fitness',
  motorcycle: 'Fitness',
  vehicle: 'Fitness',
  beauty: 'Beauty',
  fragrances: 'Beauty',
  'skin-care': 'Beauty',
};

/** Pure mapper from a DummyJSON product to our `Product`. Returns null if unmappable. */
export function mapDummyProduct(d: DummyProduct): Product | null {
  const category = CATEGORY_MAP[d.category];
  if (!category) return null;
  const price = Math.round(d.price * 100) / 100;
  // Reconstruct the pre-discount "reference" price from DummyJSON's percentage.
  // Informational context only — never framed as a limited-time deal.
  const disc = d.discountPercentage ?? 0;
  const originalPrice =
    disc > 0 ? Math.round((price / (1 - disc / 100)) * 100) / 100 : undefined;
  return {
    id: `demo-dj-${d.id}`,
    title: d.title,
    // Keep card copy tidy.
    description: d.description?.trim() || 'Demo product for simulation.',
    // Prices are illustrative only; we keep the app's EUR convention.
    price,
    currency: 'EUR',
    category,
    imageUrl: d.thumbnail,
    storeName: d.brand?.trim() || 'Demo Marketplace',
    tags: [d.category],
    source: 'demo',
    rating: typeof d.rating === 'number' ? Math.round(d.rating * 10) / 10 : undefined,
    originalPrice,
  };
}

const ENDPOINT =
  'https://dummyjson.com/products?limit=150&select=title,description,price,category,thumbnail,brand,rating,discountPercentage';

/** Fetch and map the live demo catalog. Throws on network/parse failure. */
export async function fetchRemoteProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(ENDPOINT, { signal });
  if (!res.ok) throw new Error(`DummyJSON responded with ${res.status}`);
  const data = (await res.json()) as { products?: DummyProduct[] };
  const products = (data.products ?? [])
    .map(mapDummyProduct)
    .filter((p): p is Product => p !== null);
  if (products.length === 0) throw new Error('No mappable products returned');
  return products;
}
