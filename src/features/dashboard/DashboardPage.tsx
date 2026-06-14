import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/ui/StatCard';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { ProductImage } from '../../components/product/ProductImage';
import { useOrderStore, selectStats } from '../../stores/order.store';
import {
  currentStreakDays,
  generateInsights,
  savingsInPeriods,
  STREAK_MILESTONES,
} from '../../lib/insights';
import { HOW_IT_WORKS_STEPS } from '../landing/steps';
import { useTranslation } from '../../i18n';

// Leaflet is heavy — only load the map chunk when there's something to show.
const AvoidedMap = lazy(() => import('../../components/dashboard/AvoidedMap'));

export default function DashboardPage() {
  const orders = useOrderStore((s) => s.orders);
  const stats = useOrderStore(selectStats);
  const { t, formatCurrency } = useTranslation();

  const hasActivity = orders.length > 0;
  const streak = currentStreakDays(orders);
  const periods = savingsInPeriods(orders);
  const insights = generateInsights(orders);
  const avoided = orders
    .filter((o) => o.decision === 'avoided')
    .sort(
      (a, b) =>
        new Date(b.decidedAt ?? b.createdAt).getTime() -
        new Date(a.decidedAt ?? a.createdAt).getTime(),
    );
  const nextMilestone = STREAK_MILESTONES.find((m) => m > streak);

  function renderInsight(key: string, params?: Record<string, string | number>) {
    // Translate a category param before interpolating, if present.
    if (params?.category != null) {
      return t(key, { ...params, category: t(`categories.${params.category}`) });
    }
    return t(key, params);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">{t('dashboard.title')}</h1>
        <p className="mt-1 text-sm text-ink-500">{t('dashboard.subtitle')}</p>
      </div>

      {/* Hero KPIs — money saved is the headline */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-3 lg:col-span-1 lg:row-span-2">
          <StatCard
            variant="hero"
            label={t('dashboard.moneySaved')}
            value={formatCurrency(stats.totalSaved, stats.currency)}
            hint={
              streak > 0
                ? t('streak.label', { days: streak })
                : hasActivity
                  ? t('streak.none')
                  : undefined
            }
          />
        </div>
        <StatCard label={t('dashboard.purchasesAvoided')} value={String(stats.purchasesAvoided)} />
        <StatCard label={t('dashboard.underReview')} value={String(stats.itemsMaybeLater)} />
        <StatCard label={t('dashboard.stillWanted')} value={String(stats.itemsStillWanted)} />
      </div>

      {!hasActivity ? (
        /* Onboarding / first-time value prop */
        <section className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink-900">{t('dashboard.onboardingTitle')}</h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-600 sm:text-base">
            {t('dashboard.onboardingBody')}
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link to="/products/new" className="btn-primary px-6 py-3 text-base">
              {t('catalog.urlCta')}
            </Link>
            <Link to="/products" className="btn-secondary px-6 py-3 text-base">
              {t('dashboard.browse')}
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Streak */}
          <section className="card flex items-center gap-4 p-5">
            <span aria-hidden="true" className="text-3xl">
              🔥
            </span>
            <div>
              <p className="text-lg font-bold text-ink-900">
                {streak > 0 ? t('streak.label', { days: streak }) : t('streak.none')}
              </p>
              <p className="text-sm text-ink-500">
                {streak > 0 && nextMilestone
                  ? t('streak.next', { days: nextMilestone - streak })
                  : t('streak.noneCaption')}
              </p>
            </div>
          </section>

          {/* Insights */}
          {insights.length > 0 && (
            <section className="card p-5">
              <h2 className="mb-3 text-base font-semibold text-ink-900">
                {t('dashboard.insightsTitle')}
              </h2>
              <ul className="flex flex-col gap-2">
                {insights.map((insight) => (
                  <li
                    key={insight.key}
                    className="flex items-start gap-2 rounded-xl bg-ink-50 p-3 text-sm text-ink-700"
                  >
                    <span aria-hidden="true">💡</span>
                    <span>{renderInsight(insight.key, insight.params)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Recently avoided */}
          {avoided.length > 0 && (
            <section className="card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-ink-900">
                  {t('dashboard.recentAvoidedTitle')}
                </h2>
                <Link to="/avoided-purchases" className="text-sm text-brand-700 hover:underline">
                  {t('dashboard.seeAllAvoided')}
                </Link>
              </div>
              <ul className="flex flex-col gap-3">
                {avoided.slice(0, 3).map((order) => {
                  const item = order.items[0]?.product;
                  return (
                    <li key={order.id} className="flex items-center gap-3">
                      <ProductImage
                        src={item?.imageUrl}
                        alt={item?.title ?? ''}
                        className="h-11 w-11 shrink-0 rounded-lg"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink-900">{item?.title}</p>
                        <p className="text-xs text-ink-400">{item?.category}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-brand-700">
                        {t('avoided.saved', {
                          amount: formatCurrency(order.total, order.currency),
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Where avoided purchases "come from" */}
          {avoided.length > 0 && (
            <section className="card p-5" aria-label={t('dashboard.avoidedMapTitle')}>
              <h2 className="mb-3 text-base font-semibold text-ink-900">
                {t('dashboard.avoidedMapTitle')}
              </h2>
              <Suspense
                fallback={
                  <div className="grid h-64 place-items-center rounded-xl bg-ink-50 text-sm text-ink-400">
                    {t('common.loading')}
                  </div>
                }
              >
                <AvoidedMap orders={avoided} />
              </Suspense>
            </section>
          )}

          {/* Period savings quick glance */}
          <section className="grid grid-cols-3 gap-3">
            <StatCard
              label={t('stats.savedThisWeek')}
              value={formatCurrency(periods.week, stats.currency)}
            />
            <StatCard
              label={t('stats.savedThisMonth')}
              value={formatCurrency(periods.month, stats.currency)}
            />
            <StatCard
              label={t('stats.savedThisYear')}
              value={formatCurrency(periods.year, stats.currency)}
            />
          </section>
        </>
      )}

      {/* How it works (below the fold) */}
      <section className="card p-6">
        <h2 className="text-base font-semibold text-ink-900">{t('dashboard.howTitle')}</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {HOW_IT_WORKS_STEPS.slice(0, 3).map((step) => (
            <li key={step.n}>
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="text-xl">
                  {step.emoji}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {t('landing.step', { n: step.n })}
                </span>
              </div>
              <h3 className="mt-1 text-sm font-semibold text-ink-900">
                {t(`steps.s${step.n}Title`)}
              </h3>
              <p className="mt-0.5 text-sm text-ink-500">{t(`steps.s${step.n}Desc`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Delivery is now explicitly secondary */}
      <section className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h2 className="text-sm font-semibold text-ink-700">{t('dashboard.deliveryTitle')}</h2>
          <p className="mt-1 max-w-prose text-sm text-ink-500">{t('dashboard.deliveryBody')}</p>
        </div>
        <Link to="/orders" className="btn-secondary">
          {t('dashboard.deliveryCta')}
        </Link>
      </section>

      <TransparencyNotice title={t('landing.transTitle')}>
        {t('dashboard.onboardingBody')}
      </TransparencyNotice>
    </div>
  );
}
