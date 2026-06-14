# BuyLater 🧪

**A virtual purchase simulator and impulse-purchase cooling-off tool.**

BuyLater is **not a real shop**. No real payments, orders, or deliveries happen.
It lets you simulate the satisfying ritual of buying something — checkout, order
confirmation, delivery tracking — *without spending money*, then nudges you to
decide later, with a clear head, whether you still want it. It shows you how much
you saved by waiting.

> This must never be mistaken for e-commerce. Every flow is explicitly labelled as
> a **simulation**, and transparency notices are placed wherever a user might
> otherwise expect a real transaction.

---

## What was built

A mobile-first React SPA covering the full MVP flow:

| Area | Highlights |
| --- | --- |
| **Landing** | Hero ("Pause impulse purchases before they happen."), how-it-works, why-it-exists, strong transparency notice. |
| **Catalog** | Live demo catalog (DummyJSON, ~150 items) + offline fallback; marketplace-style cards with star ratings, struck-through *reference* retail price (honest, not a discount), a gentle "Popular" tag, and a persistent "No real money charged" cue. Responsive 2/3/4-column grid, header + in-page search (URL-synced), category filter, price sort. |
| **Add your own item** | Manual entry (no scraping) with validation: name required, price > 0, valid http(s) URLs. |
| **Cart** | Quantity controls, remove, live total, strong "virtual order" transparency box. |
| **Virtual checkout** | Playful **delivery vibe** picker + **Virtual delivery location** (city/country only — never street/postcode/phone/name), **demo mode** toggle, confirm → creates order, clears cart. |
| **Order tracking** | 6-stage simulated timeline derived purely from elapsed time, **plus a simulated delivery map** (Leaflet): a courier route from a fictional warehouse to the chosen city, advancing with status. Explicitly marked as a simulation. |
| **Cooling-off decision** | "Do you still want this?" → *No* (records savings), *Maybe later* (extends review +7 days), *Yes* (optional external link). |
| **Stats** | Money saved, purchases avoided, virtual orders/spend, items still wanted, top categories (CSS bars), recent decisions. |
| **Legal** | Privacy, Terms & Disclaimer, Settings with **Clear all my data**. |
| **Navigation** | Desktop top bar + mobile bottom nav, live cart badge, custom accessible **Select** dropdowns everywhere (keyboard + type-ahead). |

**Order numbers** look like `BL-2026-000001`. **Cooling-off** is 7 days by default
(5 minutes in demo mode). Statuses progress on the spec's seconds-based pacing in
demo mode, and over hours in normal mode.

### Tech stack
React 18 · Vite 5 · TypeScript (strict) · React Router 6 · Zustand 4 (with
`persist` → localStorage) · Tailwind CSS 3 · Leaflet + react-leaflet (lazy-loaded
map) · Vitest + Testing Library. No backend, no payment integrations, no analytics
SDKs, no auth.

### Live demo catalog
The catalog is fetched at runtime from [DummyJSON](https://dummyjson.com) — a free,
public *mock* dataset with real hosted images (not scraping a real shop). It maps
DummyJSON categories onto the app's six, and reconstructs a *reference* retail price
from `discountPercentage` purely for context — never as fake urgency. If the fetch
fails, a small static list in `src/data/demo-products.ts` is used instead. Per the
product's anti-impulse positioning, there is deliberately **no fake scarcity**
("only N left"), no countdowns, and no fake discounts.

### Mindful community layer (simulated, no backend)
To give a reason to return without betraying the anti-impulse mission, the app adds
an engagement layer that is **reframed away from FOMO** and **clearly labelled as
simulated sample data**:
- **Product detail page** (`/products/:id`) with a **seller "ships from" city** on a
  mini-map, a mindful demand signal (*"N people are cooling off on this"* — not
  "N want it"), and **"second thoughts"** reflections (sample + your own, with an
  optional *"price I'd actually consider"*).
- **Watchlist** ("Watch & cool off") — a local list to reconsider later; no emails,
  no real notifications.
- **Feed** (`/feed`) — most-reconsidered items, recent (simulated) community
  decisions, and your real saved/avoided impact.

All counts, reflections, and seller cities are **deterministically derived from the
product id** (`src/lib/community.ts`) so they're stable, and every surface carries a
"Simulated community · sample data" label. No backend, no real users, no fabricated
social proof presented as real.

### Simulated delivery map
Checkout collects only **city + country** (no street, postcode, phone, or name).
`src/data/locations.ts` holds a small static city→coordinate map (10 EU cities) plus
country-level fallbacks; unknown cities still create an order and fall back to a
country approximation. The order page renders a Leaflet route from a fictional
"Virtual warehouse" to the city, with a courier marker that advances with status.
**No browser geolocation, no location permission, no precise user coordinates are
stored** — only the coarse city/country names, resolved to our own approximate
coordinates at render time.

### Internationalization (en / de / pt)
A dependency-free i18n layer lives in [src/i18n/](src/i18n/): `en.ts` defines the
shape, and `de.ts` / `pt.ts` are typed as `typeof en` so a missing key is a
compile error. `useTranslation()` returns `t(key, params)` plus locale-aware
`formatCurrency` / `formatDate` / `timeUntil` (via `Intl`). Language is detected
from the browser, switchable from the header or Settings, and persisted to
localStorage. The active language also sets `<html lang>`. Add a language by
creating a new dictionary and registering it in `LANGUAGES`.

---

## Project structure

```
src/
  app/            App.tsx, router.tsx (lazy routes), providers.tsx
  components/
    layout/       Header (search), BottomNav, Footer, AppLayout, LanguageSwitcher, …
    ui/           Select (custom dropdown), Icon, PageHeader, EmptyState, TransparencyNotice, SimulationBadge
    product/      ProductCard, ProductImage, StarRating
    order/        StatusTimeline, OrderCard, DecisionPanel, DeliveryMap (Leaflet, lazy)
  data/           demo-products.ts (fallback), locations.ts (map coordinates)
  i18n/           index.ts (store + useTranslation), en.ts, de.ts, pt.ts
  features/
    landing/      LandingPage, HowItWorksPage, steps.ts
    products/     CatalogPage, AddItemPage
    cart/         CartPage, CheckoutPage
    orders/       OrdersPage, OrderDetailPage
    stats/        StatsPage
    legal/        PrivacyPage, TermsPage, SettingsPage, NotFoundPage, Prose
  hooks/          useProducts, useVirtualBuy, useOrderTicker
  lib/            storage, currency, dates, ids, order (pure logic), product-api, analytics
  stores/         product.store, cart.store, order.store
  types/          product, cart, order, stats
  styles/         globals.css
```

**Architecture:** components render UI, Zustand stores hold state + persistence,
and business logic lives in pure functions under `lib/` (`order.ts`) so it can be
unit-tested without React. Order **status is derived from time**, not stored as a
ticking value, which keeps it correct after a refresh.

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
```

### Other scripts

```bash
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build locally
npm test           # run Vitest once (28 tests)
npm run test:watch # watch mode
npm run lint       # type-check only (tsc --noEmit)
```

### Tests
28 tests pass, covering:
- **cart store** — add / increment / remove / update quantity / total + count selectors
- **order logic** — create order (number format, cooling-off), compute status from `createdAt`, history backfill, refresh, frozen-after-decision
- **order store** — incrementing order numbers, mark avoided → money saved, still-wanted excluded, maybe-later extends review
- **storage** — missing data, invalid JSON, round-trip, single + full clear

---

## Deployment

The app is a static SPA using client-side routing, so the host must rewrite all
paths to `index.html`. Both configs are included.

### Cloudflare Pages
- **Build command:** `npm run build`
- **Output directory:** `dist`
- SPA fallback is handled by [`public/_redirects`](public/_redirects).

```bash
npm run build
npx wrangler pages deploy dist     # or connect the repo in the Cloudflare dashboard
```

### Vercel
- Framework preset: **Vite**. Build `npm run build`, output `dist`.
- SPA rewrites handled by [`vercel.json`](vercel.json).

```bash
npm run build
npx vercel --prod
```

---

## Privacy & data

Everything is stored **locally in the browser** via `localStorage` under the
`buylater:` key prefix. The app collects **no card details, no real address, no
phone number, no full name**, and processes **no payment**. The delivery map uses
only a coarse **city/country** the user picks — **no browser geolocation, no
location permission, and no precise coordinates** are requested or stored. Users
can wipe all data from **Settings → Clear all my data** (`lib/storage.ts#clearAppData`).

Analytics are **not** integrated. `lib/analytics.ts` exposes a `track()` stub that
logs events (`product_added`, `virtual_order_created`, `order_decision_*`,
`app_data_cleared`) to the console **in development only**, ready for a real sink
later.

---

## Future / affiliate integration (NOT in MVP)

Do **not** scrape Amazon or any real shop. Any future real product data must come
from an official affiliate program/API:

- Join **Amazon Associates** and use the **Product Advertising API**; comply with
  its **Operating Agreement**. No scraping of Amazon product data.
- Add affiliate links only after acceptance, and show the disclosure **before** any
  affiliate links appear:
  > *As an Amazon Associate, we earn from qualifying purchases.*

The `Product` model already has an optional `productUrl`, and the "still wanted"
flow opens it with `rel="noopener noreferrer nofollow"` — but BuyLater never
pretends to sell the item directly.

---

## Assumptions

- **Currency** defaults to **EUR**, formatted per the active language's locale.
- **Demo mode** accelerates both delivery pacing *and* cooling-off (5 min) so the
  flow is testable without waiting 7 days.
- Order numbers use the current year and a per-browser monotonic counter, so they
  are unique per device, not globally.
- The live catalog comes from the DummyJSON mock dataset; the offline fallback uses
  fictional placeholders. DummyJSON titles may contain real brand names — these are
  third-party mock data, and BuyLater is not affiliated with or endorsing any brand.
- The map uses 10 static EU cities + country fallbacks; map tiles load from
  OpenStreetMap at runtime.
- "Money saved" reflects virtual prices for motivation only — it is not financial
  advice or a real transaction.

## Known limitations

- **No cross-device sync** — data lives only in the current browser; clearing
  storage or switching devices loses it.
- **No backend / accounts / auth** — by design for the MVP.
- Status only advances while a tracking screen is open (a 1s ticker), but is always
  recomputed correctly from `createdAt` on load, so nothing is lost.
- Order numbers are not globally unique (per-browser counter).
- No image upload — custom product images are remote URLs only.
- Minimal charting (CSS bars), no charting dependency.
- The catalog and map both fetch from third-party services at runtime
  (DummyJSON data/images, OpenStreetMap tiles); offline, the catalog falls back to
  a static list and the map only renders when a location resolves.

---

## License

[MIT](LICENSE) © 2026 Oleksii Bilan. Provided for portfolio/demo purposes; the
"BuyLater" concept and copy are simulation-only and not a real commercial service.
