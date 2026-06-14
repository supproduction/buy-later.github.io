import type { Product } from '../types/product';

/**
 * Static demo catalog — used as the OFFLINE FALLBACK.
 *
 * The live catalog is fetched at runtime from DummyJSON (see lib/product-api.ts).
 * This list is shown only when that fetch fails (offline/blocked).
 *
 * These are fictional, illustrative items — NOT real products for sale. Store
 * names are invented placeholders and no real brand logos are used. Images are
 * neutral remote placeholders. Nothing here can be purchased through the app.
 *
 * FUTURE / affiliate note: do NOT scrape Amazon or any real shop to populate
 * this list. Any real product data must come from an official affiliate
 * program/API (e.g. Amazon Product Advertising API after joining Amazon
 * Associates) and comply with its Operating Agreement, with a visible
 * affiliate disclosure ("As an Amazon Associate, we earn from qualifying
 * purchases."). See README "Future / affiliate integration".
 */

const img = (seed: string) =>
  `https://placehold.co/600x600/eefbf7/14544a?text=${encodeURIComponent(seed)}`;

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'demo-noise-headphones',
    title: 'Noise-cancelling headphones',
    description:
      'The over-ear pair you keep almost adding to a cart at 1am. Great sound, big price.',
    price: 279,
    currency: 'EUR',
    category: 'Tech',
    imageUrl: img('Headphones'),
    storeName: 'DemoTech Outlet',
    tags: ['audio', 'wishlist', 'wants'],
    source: 'demo',
  },
  {
    id: 'demo-mechanical-keyboard',
    title: 'Mechanical keyboard',
    description: 'Clicky, customizable, and very easy to justify buying a third time.',
    price: 139,
    currency: 'EUR',
    category: 'Tech',
    imageUrl: img('Keyboard'),
    storeName: 'DemoTech Outlet',
    tags: ['desk', 'productivity'],
    source: 'demo',
  },
  {
    id: 'demo-sneakers',
    title: 'Limited-edition sneakers',
    description: 'Look great, hurt the wallet. The classic emotional-spending candidate.',
    price: 189,
    currency: 'EUR',
    category: 'Fashion',
    imageUrl: img('Sneakers'),
    storeName: 'Placeholder Apparel',
    tags: ['shoes', 'limited'],
    source: 'demo',
  },
  {
    id: 'demo-denim-jacket',
    title: 'Everyday denim jacket',
    description: 'You own two already. This one is, somehow, different.',
    price: 95,
    currency: 'EUR',
    category: 'Fashion',
    imageUrl: img('Jacket'),
    storeName: 'Placeholder Apparel',
    tags: ['outerwear'],
    source: 'demo',
  },
  {
    id: 'demo-espresso-machine',
    title: 'Compact espresso machine',
    description: 'The "I will totally stop buying coffee out" purchase.',
    price: 229,
    currency: 'EUR',
    category: 'Home',
    imageUrl: img('Espresso'),
    storeName: 'Sample Home Goods',
    tags: ['kitchen', 'coffee'],
    source: 'demo',
  },
  {
    id: 'demo-scented-candle-set',
    title: 'Scented candle set',
    description: 'A calming three-pack. Calming, also, to not buy.',
    price: 42,
    currency: 'EUR',
    category: 'Home',
    imageUrl: img('Candles'),
    storeName: 'Sample Home Goods',
    tags: ['decor', 'cozy'],
    source: 'demo',
  },
  {
    id: 'demo-adjustable-dumbbells',
    title: 'Adjustable dumbbells',
    description: 'Future-you will definitely use these every morning. Definitely.',
    price: 320,
    currency: 'EUR',
    category: 'Fitness',
    imageUrl: img('Dumbbells'),
    storeName: 'MockFit Supply',
    tags: ['home-gym', 'strength'],
    source: 'demo',
  },
  {
    id: 'demo-yoga-mat',
    title: 'Premium yoga mat',
    description: 'Extra grippy, extra optimistic about your 6am routine.',
    price: 68,
    currency: 'EUR',
    category: 'Fitness',
    imageUrl: img('Yoga+Mat'),
    storeName: 'MockFit Supply',
    tags: ['wellness'],
    source: 'demo',
  },
  {
    id: 'demo-skincare-bundle',
    title: 'Skincare bundle',
    description: 'Five steps you will follow for, realistically, four days.',
    price: 84,
    currency: 'EUR',
    category: 'Beauty',
    imageUrl: img('Skincare'),
    storeName: 'Demo Beauty Co.',
    tags: ['routine', 'self-care'],
    source: 'demo',
  },
  {
    id: 'demo-hair-dryer',
    title: 'Ionic hair dryer',
    description: 'Suspiciously expensive air. Tempting, though.',
    price: 199,
    currency: 'EUR',
    category: 'Beauty',
    imageUrl: img('Hair+Dryer'),
    storeName: 'Demo Beauty Co.',
    tags: ['styling'],
    source: 'demo',
  },
  {
    id: 'demo-game-console',
    title: 'Handheld game console',
    description: 'A backlog machine you will lovingly add 40 unplayed games to.',
    price: 349,
    currency: 'EUR',
    category: 'Gaming',
    imageUrl: img('Console'),
    storeName: 'PixelPlay Demo',
    tags: ['handheld', 'wishlist'],
    source: 'demo',
  },
  {
    id: 'demo-mechanical-mouse',
    title: 'Pro gaming mouse',
    description: 'Eight buttons you will remap once and never touch again.',
    price: 79,
    currency: 'EUR',
    category: 'Gaming',
    imageUrl: img('Mouse'),
    storeName: 'PixelPlay Demo',
    tags: ['accessory'],
    source: 'demo',
  },
];
