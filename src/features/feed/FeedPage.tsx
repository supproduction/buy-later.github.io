import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { ProductImage } from '../../components/product/ProductImage';
import { useProducts } from '../../hooks/useProducts';
import { useCommunityStore } from '../../stores/community.store';
import { useOrderStore, selectStats } from '../../stores/order.store';
import { flagFor, reconsiderCountFor, sellerCityFor } from '../../lib/community';
import { useTranslation } from '../../i18n';

export default function FeedPage() {
  const { products, isLoading } = useProducts();
  const watch = useCommunityStore((s) => s.watch);
  const removeWatch = useCommunityStore((s) => s.removeWatch);
  const stats = useOrderStore(selectStats);
  const { t, formatCurrency } = useTranslation();

  const detailHref = (id: string) => `/products/${encodeURIComponent(id)}`;

  // Most "reconsidered" right now (deterministic ordering, simulated).
  const popular = [...products]
    .sort((a, b) => reconsiderCountFor(b.id) - reconsiderCountFor(a.id))
    .slice(0, 8);

  // A simulated "community decisions" feed, seeded from a different slice.
  const recent = [...products]
    .sort((a, b) => reconsiderCountFor(a.id) - reconsiderCountFor(b.id))
    .slice(0, 6);

  return (
    <div>
      <PageHeader title={t('feed.title')} subtitle={t('feed.subtitle')} />

      {/* Your impact */}
      <section className="card mb-5 p-5">
        <h2 className="text-base font-semibold text-ink-900">{t('feed.yourImpact')}</h2>
        <p className="mt-1 text-sm text-ink-600">
          {stats.purchasesAvoided > 0
            ? t('feed.yourSaved', {
                count: stats.purchasesAvoided,
                amount: formatCurrency(stats.totalSaved, stats.currency),
              })
            : t('feed.yourSavedEmpty')}
        </p>
      </section>

      {/* Your watchlist */}
      <section className="mb-5">
        <h2 className="mb-2 text-base font-semibold text-ink-900">{t('watch.title')}</h2>
        {watch.length === 0 ? (
          <p className="text-sm text-ink-500">{t('watch.empty')}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {watch.map(({ product }) => (
              <li key={product.id} className="card flex items-center gap-3 p-3">
                <Link to={detailHref(product.id)} className="shrink-0">
                  <ProductImage
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-12 w-12 rounded-lg"
                  />
                </Link>
                <Link to={detailHref(product.id)} className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-ink-900">{product.title}</p>
                  <p className="text-xs text-ink-400">
                    {formatCurrency(product.price, product.currency)}
                  </p>
                </Link>
                <button
                  type="button"
                  className="btn-ghost text-rose-600 hover:bg-rose-50"
                  onClick={() => removeWatch(product.id)}
                >
                  {t('watch.remove')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Most reconsidered */}
      <section className="mb-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-ink-900">{t('feed.popularTitle')}</h2>
          <span className="chip bg-ink-100 text-ink-500">{t('community.sampleLabel')}</span>
        </div>
        {isLoading && popular.length === 0 ? (
          <p className="text-sm text-ink-400">{t('feed.loading')}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {popular.map((product) => {
              const seller = sellerCityFor(product.id);
              return (
                <li key={product.id} className="card p-3">
                  <Link to={detailHref(product.id)} className="flex items-center gap-3">
                    <ProductImage
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-12 w-12 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink-900">{product.title}</p>
                      <p className="flex items-center gap-1 text-xs text-ink-400">
                        <span aria-hidden="true">{flagFor(seller.country)}</span>
                        {seller.city}
                      </p>
                    </div>
                    <span className="chip shrink-0 bg-brand-50 text-brand-700">
                      🧊 {t('community.coolingChip', { count: reconsiderCountFor(product.id) })}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Recent community decisions (simulated) */}
      <section className="mb-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-ink-900">{t('feed.recentTitle')}</h2>
          <span className="chip bg-ink-100 text-ink-500">{t('community.sampleLabel')}</span>
        </div>
        <ul className="flex flex-col gap-2">
          {recent.map((product) => {
            const seller = sellerCityFor(product.id);
            return (
              <li key={product.id} className="card flex items-center gap-2 p-3 text-sm text-ink-700">
                <span aria-hidden="true">🙌</span>
                <span>
                  {t('feed.communityAvoided', {
                    city: seller.city,
                    item: product.title,
                    amount: formatCurrency(product.price, product.currency),
                  })}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <TransparencyNotice>{t('community.sampleLabel')}.</TransparencyNotice>
    </div>
  );
}
