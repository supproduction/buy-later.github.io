import { lazy, Suspense, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { ProductImage } from '../../components/product/ProductImage';
import { StarRating } from '../../components/product/StarRating';
import { WatchButton } from '../../components/product/WatchButton';
import { useProducts } from '../../hooks/useProducts';
import { useVirtualBuy } from '../../hooks/useVirtualBuy';
import { useCommunityStore } from '../../stores/community.store';
import {
  flagFor,
  reconsiderCountFor,
  sampleReflectionsFor,
  sellerCityFor,
} from '../../lib/community';
import { useTranslation } from '../../i18n';

const CityMap = lazy(() => import('../../components/product/CityMap'));

export default function ProductDetailPage() {
  const { productId } = useParams();
  const id = productId ?? '';
  const { products } = useProducts();
  const watch = useCommunityStore((s) => s.watch);
  const userReflections = useCommunityStore((s) => s.reflections[id] ?? []);
  const addReflection = useCommunityStore((s) => s.addReflection);
  const removeReflection = useCommunityStore((s) => s.removeReflection);
  const { addToCart, virtualBuyNow } = useVirtualBuy();
  const { t, formatCurrency } = useTranslation();

  const [text, setText] = useState('');
  const [price, setPrice] = useState('');

  const product =
    products.find((p) => p.id === id) ?? watch.find((w) => w.product.id === id)?.product;

  if (!product) {
    return (
      <div>
        <PageHeader title={t('productDetail.notFoundTitle')} />
        <EmptyState
          emoji="🔎"
          title={t('productDetail.notFoundTitle')}
          description={t('productDetail.notFoundDesc')}
          action={{ to: '/products', label: t('productDetail.back2') }}
        />
      </div>
    );
  }

  const seller = sellerCityFor(product.id);
  const reconsidering = reconsiderCountFor(product.id);
  const samples = sampleReflectionsFor(product.id, product.price);
  const hasRef = product.originalPrice != null && product.originalPrice > product.price;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const parsed = Number(price);
    addReflection(id, text, price.trim() && parsed > 0 ? parsed : undefined);
    setText('');
    setPrice('');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-2">
        <Link to="/products" className="text-sm text-brand-700 hover:underline">
          {t('productDetail.back')}
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ProductImage
          src={product.imageUrl}
          alt={product.title}
          className="aspect-square w-full rounded-2xl ring-1 ring-ink-100"
        />

        <div className="flex flex-col">
          <span className="chip w-fit bg-ink-100 text-ink-600">
            {t(`categories.${product.category}`)}
          </span>
          <h1 className="mt-2 text-2xl font-bold text-ink-900">{product.title}</h1>
          {product.storeName && <p className="text-sm text-ink-400">{product.storeName}</p>}
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-500">
            <span aria-hidden="true">{flagFor(seller.country)}</span>
            {t('productDetail.shipsFrom')} {seller.city}, {seller.country}
          </p>

          {product.rating != null && <StarRating rating={product.rating} className="mt-2" />}

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink-900">
              {formatCurrency(product.price, product.currency)}
            </span>
            {hasRef && (
              <span className="text-sm text-ink-400 line-through" title={t('product.refPriceTitle')}>
                {formatCurrency(product.originalPrice as number, product.currency)}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink-600">{product.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={() => addToCart(product)}>
              {t('product.addToCart')}
            </button>
            <button type="button" className="btn-primary" onClick={() => virtualBuyNow(product)}>
              {t('product.virtualBuy')}
            </button>
            <WatchButton product={product} variant="full" />
          </div>
          <p className="mt-2 text-xs text-ink-400">{t('watch.help')}</p>
        </div>
      </div>

      {/* Mindful demand signal (simulated, reframed away from FOMO) */}
      <section className="card mt-6 p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-ink-900">
            🧊 {t('community.reconsidering', { count: reconsidering })}
          </h2>
          <span className="chip bg-ink-100 text-ink-500">{t('community.sampleLabel')}</span>
        </div>
      </section>

      {/* Seller map */}
      <section className="card mt-6 p-5" aria-label={t('productDetail.sellerMapTitle')}>
        <h2 className="mb-3 text-base font-semibold text-ink-900">
          {t('productDetail.sellerMapTitle')}
        </h2>
        <Suspense
          fallback={
            <div className="grid h-56 place-items-center rounded-xl bg-ink-50 text-sm text-ink-400">
              {t('orderDetail.mapLoading')}
            </div>
          }
        >
          <CityMap
            coords={seller.coords}
            label={`${flagFor(seller.country)} ${seller.city}`}
          />
        </Suspense>
        <p className="mt-2 text-xs text-ink-400">{t('productDetail.sellerMapNote')}</p>
      </section>

      {/* Reflections ("second thoughts") */}
      <section className="card mt-6 p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-ink-900">
            {t('community.reflectionsTitle')}
          </h2>
          <span className="chip bg-ink-100 text-ink-500">{t('community.sampleLabel')}</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 rounded-xl bg-ink-50 p-3">
          <label htmlFor="reflection" className="label">
            {t('community.addTitle')}
          </label>
          <textarea
            id="reflection"
            className="input min-h-[64px] resize-y"
            placeholder={t('community.placeholder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap items-end gap-2">
            <div className="flex-1">
              <label htmlFor="reflection-price" className="label">
                {t('community.priceLabel')}
              </label>
              <input
                id="reflection-price"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                className="input"
                placeholder={t('community.pricePlaceholder')}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={!text.trim()}>
              {t('community.post')}
            </button>
          </div>
        </form>

        <ul className="mt-4 flex flex-col gap-3">
          {userReflections.map((r) => (
            <li key={r.id} className="rounded-xl border border-brand-100 bg-brand-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-700">{t('community.you')}</span>
                <button
                  type="button"
                  className="text-xs text-ink-400 hover:text-rose-600"
                  onClick={() => removeReflection(id, r.id)}
                >
                  {t('watch.remove')}
                </button>
              </div>
              <p className="mt-1 text-sm text-ink-800">{r.text}</p>
              {r.price != null && (
                <p className="mt-1 text-xs font-medium text-brand-700">
                  {t('community.wouldConsider', {
                    price: formatCurrency(r.price, product.currency),
                  })}
                </p>
              )}
            </li>
          ))}

          {samples.map((s) => (
            <li key={s.id} className="rounded-xl border border-ink-100 p-3">
              <span className="text-xs font-medium text-ink-400">🧊</span>
              <p className="mt-0.5 text-sm text-ink-700">
                {t(`community.reflect.${s.key}`, {
                  days: s.days,
                  price: s.price != null ? formatCurrency(s.price, product.currency) : '',
                })}
              </p>
            </li>
          ))}

          {samples.length === 0 && userReflections.length === 0 && (
            <li className="text-sm text-ink-500">{t('community.empty')}</li>
          )}
        </ul>
      </section>

      <div className="mt-6">
        <TransparencyNotice>{t('community.sampleLabel')}.</TransparencyNotice>
      </div>
    </div>
  );
}
