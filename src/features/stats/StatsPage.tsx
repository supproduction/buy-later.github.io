import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { DELIVERY_VIBES, type OrderDecision } from '../../types/order';
import { useOrderStore, selectStats } from '../../stores/order.store';
import { savingsByMonth, savingsInPeriods } from '../../lib/insights';
import { useTranslation } from '../../i18n';

const DECISION_KEY: Record<OrderDecision, string> = {
  avoided: 'stats.avoided',
  still_wanted: 'orders.stillWanted',
  maybe_later: 'orders.maybeLater',
};

function StatTile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`card p-4 ${accent ? 'bg-brand-600 text-white ring-brand-600' : ''}`}>
      <p className={`text-xs font-medium ${accent ? 'text-brand-50' : 'text-ink-500'}`}>
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function StatsPage() {
  const orders = useOrderStore((s) => s.orders);
  const stats = useOrderStore(selectStats);
  const { t, formatCurrency, formatDate } = useTranslation();

  if (orders.length === 0) {
    return (
      <div>
        <PageHeader title={t('stats.title')} />
        <EmptyState
          emoji="📊"
          title={t('stats.emptyTitle')}
          description={t('stats.emptyDesc')}
          action={{ to: '/products', label: t('stats.emptyCta') }}
        />
      </div>
    );
  }

  const maxCategory = stats.topCategoriesByAvoidedSpend[0]?.amount ?? 0;
  const recent = orders.slice(0, 6);
  const periods = savingsInPeriods(orders);
  const months = savingsByMonth(orders, 6);
  const maxMonth = Math.max(1, ...months.map((m) => m.amount));
  const monthLabel = (key: string) => {
    const [y, m] = key.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'short' });
  };

  return (
    <div>
      <PageHeader title={t('stats.title')} subtitle={t('stats.subtitle')} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile
          label={t('stats.moneySaved')}
          value={formatCurrency(stats.totalSaved, stats.currency)}
          accent
        />
        <StatTile label={t('stats.purchasesAvoided')} value={String(stats.purchasesAvoided)} />
        <StatTile label={t('stats.virtualOrders')} value={String(stats.totalOrders)} />
        <StatTile
          label={t('stats.virtuallySpent')}
          value={formatCurrency(stats.totalVirtuallySpent, stats.currency)}
        />
        <StatTile label={t('stats.stillWanted')} value={String(stats.itemsStillWanted)} />
        <StatTile label={t('stats.maybeLater')} value={String(stats.itemsMaybeLater)} />
      </div>

      <div className="mt-3">
        <TransparencyNotice>
          {t('stats.savedNotePre')}
          <strong>{t('stats.savedNoteBold')}</strong>
          {t('stats.savedNotePost')}
        </TransparencyNotice>
      </div>

      <section className="mt-5 grid grid-cols-3 gap-3">
        <StatTile
          label={t('stats.savedThisWeek')}
          value={formatCurrency(periods.week, stats.currency)}
        />
        <StatTile
          label={t('stats.savedThisMonth')}
          value={formatCurrency(periods.month, stats.currency)}
        />
        <StatTile
          label={t('stats.savedThisYear')}
          value={formatCurrency(periods.year, stats.currency)}
        />
      </section>

      <section className="card mt-5 p-5" aria-label={t('stats.byMonth')}>
        <h2 className="text-base font-semibold text-ink-900">{t('stats.byMonth')}</h2>
        <div className="mt-4 flex h-40 items-end gap-2">
          {months.map((m) => (
            <div key={m.key} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-brand-500"
                  style={{ height: `${m.amount > 0 ? Math.max(4, (m.amount / maxMonth) * 100) : 0}%` }}
                  title={formatCurrency(m.amount, stats.currency)}
                />
              </div>
              <span className="text-[10px] font-medium text-ink-400">{monthLabel(m.key)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-5 p-5" aria-label={t('stats.topCategories')}>
        <h2 className="text-base font-semibold text-ink-900">{t('stats.topCategories')}</h2>
        {stats.topCategoriesByAvoidedSpend.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">{t('stats.topEmpty')}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {stats.topCategoriesByAvoidedSpend.map((c) => (
              <li key={c.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-700">{t(`categories.${c.category}`)}</span>
                  <span className="text-ink-500">{formatCurrency(c.amount, stats.currency)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{
                      width: `${maxCategory ? Math.max(6, (c.amount / maxCategory) * 100) : 0}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card mt-5 p-5" aria-label={t('stats.recent')}>
        <h2 className="text-base font-semibold text-ink-900">{t('stats.recent')}</h2>
        <ul className="mt-3 divide-y divide-ink-100">
          {recent.map((order) => {
            const vibe = DELIVERY_VIBES.find((v) => v.value === order.deliveryVibe);
            return (
              <li key={order.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-mono text-sm font-medium text-ink-900">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-ink-400">
                    {formatDate(order.createdAt)} · {vibe ? t(`vibes.${vibe.value}`) : ''}
                  </p>
                </div>
                <span
                  className={`chip ${
                    order.decision === 'avoided'
                      ? 'bg-brand-100 text-brand-700'
                      : order.decision === 'still_wanted'
                        ? 'bg-ink-100 text-ink-600'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.decision ? t(DECISION_KEY[order.decision]) : t('stats.pending')}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
