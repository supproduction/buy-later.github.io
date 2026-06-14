import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { StatCard } from '../../components/ui/StatCard';
import { ProductImage } from '../../components/product/ProductImage';
import { ImpulseBadge } from '../../components/product/ImpulseBadge';
import { useOrderStore, selectStats } from '../../stores/order.store';
import { useTranslation } from '../../i18n';

export default function AvoidedPurchasesPage() {
  const orders = useOrderStore((s) => s.orders);
  const stats = useOrderStore(selectStats);
  const { t, formatCurrency, timeAgo } = useTranslation();

  const avoided = orders
    .filter((o) => o.decision === 'avoided')
    .sort(
      (a, b) =>
        new Date(b.decidedAt ?? b.createdAt).getTime() -
        new Date(a.decidedAt ?? a.createdAt).getTime(),
    );

  if (avoided.length === 0) {
    return (
      <div>
        <PageHeader title={t('avoided.title')} subtitle={t('avoided.subtitle')} />
        <EmptyState
          emoji="💚"
          title={t('avoided.emptyTitle')}
          description={t('avoided.emptyDesc')}
          action={{ to: '/products', label: t('avoided.emptyCta') }}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t('avoided.title')} subtitle={t('avoided.subtitle')} />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <StatCard
            variant="hero"
            label={t('avoided.cumulative')}
            value={formatCurrency(stats.totalSaved, stats.currency)}
            hint={t('avoided.count', { count: avoided.length })}
          />
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {avoided.map((order) => {
          const item = order.items[0]?.product;
          const decidedAt = order.decidedAt ?? order.createdAt;
          return (
            <li key={order.id} className="card flex gap-3 p-3">
              <ProductImage
                src={item?.imageUrl}
                alt={item?.title ?? ''}
                className="h-20 w-20 shrink-0 rounded-xl"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="truncate font-semibold text-ink-900">{item?.title}</h3>
                <p className="text-xs text-ink-400">
                  {item ? t(`categories.${item.category}`) : ''}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-brand-700">
                    {t('avoided.saved', {
                      amount: formatCurrency(order.total, order.currency),
                    })}
                  </span>
                  {item?.originalPrice != null && item.originalPrice > item.price && (
                    <span className="text-xs text-ink-400">
                      {t('avoided.original', {
                        amount: formatCurrency(item.originalPrice, order.currency),
                      })}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <span className="text-xs text-ink-400">
                    {t('avoided.avoidedAgo', { time: timeAgo(decidedAt) })}
                  </span>
                  {item && <ImpulseBadge product={item} />}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
