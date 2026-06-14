import { Link } from 'react-router-dom';
import { SimulationBadge } from '../../components/ui/SimulationBadge';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { useTranslation } from '../../i18n';
import { HOW_IT_WORKS_STEPS } from './steps';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="pt-4 text-center sm:pt-10">
        <div className="mb-4 flex justify-center">
          <SimulationBadge />
        </div>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
          {t('landing.heroTitle')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-ink-500 sm:text-lg">
          {t('landing.heroText')}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/products" className="btn-primary w-full px-6 py-3 text-base sm:w-auto">
            {t('landing.ctaStart')}
          </Link>
          <Link to="/how-it-works" className="btn-secondary w-full px-6 py-3 text-base sm:w-auto">
            {t('landing.ctaHow')}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-center text-xl font-bold text-ink-900">
          {t('landing.howHeading')}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.n} className="card p-5">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-xl"
                >
                  {step.emoji}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {t('landing.step', { n: step.n })}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-ink-900">{t(`steps.s${step.n}Title`)}</h3>
              <p className="mt-1 text-sm text-ink-500">{t(`steps.s${step.n}Desc`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why this exists */}
      <section aria-labelledby="why-heading" className="card p-6 sm:p-8">
        <h2 id="why-heading" className="text-xl font-bold text-ink-900">
          {t('landing.whyHeading')}
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-600 sm:text-base">
          <p>{t('landing.whyP1')}</p>
          <p>{t('landing.whyP2')}</p>
          <p>{t('landing.whyP3')}</p>
        </div>
      </section>

      {/* Transparency */}
      <section>
        <TransparencyNotice variant="strong" title={t('landing.transTitle')}>
          {t('landing.transPre')}
          <Link to="/terms" className="font-semibold underline">
            {t('landing.transTerms')}
          </Link>
          {t('landing.transAnd')}
          <Link to="/privacy" className="font-semibold underline">
            {t('landing.transPrivacy')}
          </Link>
          {t('landing.transPost')}
        </TransparencyNotice>
      </section>
    </div>
  );
}
