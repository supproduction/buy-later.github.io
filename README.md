# BuyLater 🟢

**A mindful-spending tool. Pause before you buy.**

BuyLater helps you **reduce impulse spending**. Add the thing you almost bought,
give the urge a cooling-off period, and decide later with a clear head — then
track **the money you chose not to spend**. It never takes payment and never sells
anything.

> Not BNPL — the opposite. Where Klarna/Affirm make spending frictionless,
> BuyLater makes *not* spending rewarding. The headline is always **money saved**.

---

## What was built

A mobile-first React SPA centred on the savings habit:

| Area | Highlights |
| --- | --- |
| **Dashboard (home)** | Money-first: a large **Money saved** KPI, plus Purchases avoided / Items under review / Still wanted. **Streak** ("N-day streak"), data-driven **insights**, recently-avoided preview, and week/month/year savings. Onboarding value-prop for first-time visitors; how-it-works and delivery preview kept below the fold. |
| **Avoided purchases** (`/avoided-purchases`) | Cumulative **Total saved** hero + a card per avoided item: image, title, category, saved amount, reference price, "avoided N days ago", and **impulse score**. |
| **Catalog** | URL-first: a prominent **"Add what you almost bought"** action; the demo catalog (DummyJSON + offline fallback) is the secondary "common temptations" grid. Cards show ratings, reference price, an **impulse-score** chip, a "No real money charged" cue, and a watch toggle. Search (URL-synced) + category filter + price sort. |
| **Add what you almost bought** | Paste-a-link-first form (the link is stored), then name + price (validated). No scraping. |
| **Cooling-off flow** | Pause → cooling-off period → decision. "Do you still want this?" → *No* (celebration: "You just saved €X"), *Maybe later* (extends review), *Yes* (optional original-product link). |
| **Statistics** | Money saved this week/month/year, a 6-month savings **bar chart**, top categories, counts, recent decisions. |
| **Impulse score** | 0–100 heuristic (price + category) with Low/Medium/High bands, shown on cards, detail, and avoided items. |
| **Delivery preview (secondary)** | Optional 6-stage timeline derived from elapsed time — explicitly framed as a way to stretch the pause, not the point. |
| **Legal / Settings** | Privacy, Terms & Disclaimer, Settings with **Clear all my data**. |
| **Navigation** | Focused primary nav (Home · Products · Avoided · Statistics); Cart is a secondary header icon. Custom accessible **Select** dropdowns; i18n (en/de/pt). |

**Order numbers** look like `BL-2026-000001`. **Cooling-off** is 7 days by default
(5 minutes in demo mode).

### Tech stack
React 18 · Vite 5 · TypeScript (strict) · React Router 6 · Zustand 4 (with
`persist` → localStorage) · Tailwind CSS 3 · Vitest + Testing Library. No backend,
no payment integrations, no analytics SDKs, no auth.

### Live demo catalog
The catalog is fetched at runtime from [DummyJSON](https://dummyjson.com) — a free,
public *mock* dataset with real hosted images (not scraping a real shop). It maps
DummyJSON categories onto the app's six, and reconstructs a *reference* retail price
from `discountPercentage` purely for context — never as fake urgency. If the fetch
fails, a small static list in `src/data/demo-products.ts` is used instead. Per the
product's anti-impulse positioning, there is deliberately **no fake scarcity**
("only N left"), no countdowns, and no fake discounts.

### Insights, streak & impulse score
Pure, unit-tested derivations in `src/lib/`:
- **`insights.ts`** — savings bucketed by week/month/year and by calendar month,
  the current "days without an impulse purchase" **streak**, and simple text
  **insights** (top avoided category, category share, month-over-month, weekend
  pattern). No AI.
- **`impulse-score.ts`** — a 0–100 heuristic from price + category with Low/Medium/
  High bands.

> An earlier exploration added a simulated "community" layer (counts, reflections,
> feed) and a delivery/seller map. These were **removed** during the mindful-spending
> repositioning: fabricated social proof and a delivery-tracking gimmick undercut a
> tool whose whole pitch is honesty about money.

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
    layout/       Header (search + cart icon), BottomNav, Footer, AppLayout, LanguageSwitcher
    ui/           Select (custom dropdown), StatCard, Icon, PageHeader, EmptyState, TransparencyNotice
    product/      ProductCard, ProductImage, StarRating, ImpulseBadge, WatchButton
    order/        StatusTimeline, OrderCard, DecisionPanel
  data/           demo-products.ts (offline fallback)
  i18n/           index.ts (store + useTranslation), en.ts, de.ts, pt.ts
  features/
    dashboard/    DashboardPage (home)
    avoided/      AvoidedPurchasesPage
    landing/      HowItWorksPage, steps.ts
    products/     CatalogPage, AddItemPage, ProductDetailPage
    cart/         CartPage, CheckoutPage
    orders/       OrdersPage, OrderDetailPage
    stats/        StatsPage
    legal/        PrivacyPage, TermsPage, SettingsPage, NotFoundPage, Prose
  hooks/          useProducts, useVirtualBuy, useOrderTicker
  lib/            storage, currency, dates, ids, order, insights, impulse-score, product-api, analytics
  stores/         product.store, cart.store, order.store, community.store (watchlist)
  types/          product, cart, order, stats
  styles/         globals.css
```

**Architecture:** components render UI, Zustand stores hold state + persistence,
and business logic lives in pure, unit-tested functions under `lib/`
(`order.ts`, `insights.ts`, `impulse-score.ts`). Order **status is derived from
time**, not stored as a ticking value, so it stays correct after a refresh.

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
npm test           # run Vitest once (43 tests)
npm run test:watch # watch mode
npm run lint       # type-check only (tsc --noEmit)
```

### Tests
43 tests pass, covering:
- **cart store** — add / increment / remove / update quantity / total + count selectors
- **order logic** — create order (number format, cooling-off), compute status from `createdAt`, history backfill, refresh, frozen-after-decision
- **order store** — incrementing order numbers, mark avoided → money saved, still-wanted excluded, maybe-later extends review
- **insights** — savings by period/month, streak (since last give-in), generated insights
- **impulse score** — band thresholds, category/price monotonicity, determinism
- **storage** — missing data, invalid JSON, round-trip, single + full clear
- **product-api** — DummyJSON mapping (category, reference price, fallbacks)

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
