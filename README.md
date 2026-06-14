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
| **Catalog** | 12 fictional demo products, responsive 2/3-column grid, search by title, filter by category, sort by price. |
| **Add your own item** | Manual entry (no scraping) with validation: name required, price > 0, valid http(s) URLs. |
| **Cart** | Quantity controls, remove, live total, strong "virtual order" transparency box. |
| **Virtual checkout** | Playful **delivery vibe** picker (no real address), **demo mode** toggle, confirm → creates order, clears cart. |
| **Order tracking** | 6-stage simulated timeline derived purely from elapsed time; explicitly marked as a simulation. |
| **Cooling-off decision** | "Do you still want this?" → *No* (records savings), *Maybe later* (extends review +7 days), *Yes* (optional external link). |
| **Stats** | Money saved, purchases avoided, virtual orders/spend, items still wanted, top categories (CSS bars), recent decisions. |
| **Legal** | Privacy, Terms & Disclaimer, Settings with **Clear all my data**. |
| **Navigation** | Desktop top bar + mobile bottom nav, with a live cart badge. |

**Order numbers** look like `BL-2026-000001`. **Cooling-off** is 7 days by default
(5 minutes in demo mode). Statuses progress on the spec's seconds-based pacing in
demo mode, and over hours in normal mode.

### Tech stack
React 18 · Vite 5 · TypeScript (strict) · React Router 6 · Zustand 4 (with
`persist` → localStorage) · Tailwind CSS 3 · Vitest + Testing Library. No backend,
no payment integrations, no analytics SDKs, no auth.

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
    layout/       Header, BottomNav, Footer, AppLayout, ScrollToTop, nav-items
    ui/           Icon, PageHeader, EmptyState, TransparencyNotice, SimulationBadge
    product/      ProductCard, ProductImage
    order/        StatusTimeline, OrderCard, DecisionPanel
  data/           demo-products.ts
  features/
    landing/      LandingPage, HowItWorksPage, steps.ts
    products/     CatalogPage, AddItemPage
    cart/         CartPage, CheckoutPage
    orders/       OrdersPage, OrderDetailPage
    stats/        StatsPage
    legal/        PrivacyPage, TermsPage, SettingsPage, NotFoundPage, Prose
  hooks/          useProducts, useVirtualBuy, useOrderTicker
  lib/            storage, currency, dates, ids, order (pure logic), analytics
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
phone number**, and processes **no payment**. Users can wipe all data from
**Settings → Clear all my data** (`lib/storage.ts#clearAppData`).

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

- **Currency** defaults to **EUR** (product copy references "€X").
- **Demo mode** accelerates both delivery pacing *and* cooling-off (5 min) so the
  flow is testable without waiting 7 days.
- Order numbers use the current year and a per-browser monotonic counter, so they
  are unique per device, not globally.
- The demo catalog, store names, and images are fictional placeholders
  (`placehold.co`); no real brands or logos are used.
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
