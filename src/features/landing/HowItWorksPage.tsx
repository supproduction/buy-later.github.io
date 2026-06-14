import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { useTranslation } from '../../i18n';
import { HOW_IT_WORKS_STEPS } from './steps';

export default function HowItWorksPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t('how.title')} subtitle={t('how.subtitle')} />

      <ol className="flex flex-col gap-4">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li key={step.n} className="card flex gap-4 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 font-bold text-white">
              {step.n}
            </span>
            <div>
              <h2 className="font-semibold text-ink-900">
                <span aria-hidden="true" className="mr-2">
                  {step.emoji}
                </span>
                {t(`steps.s${step.n}Title`)}
              </h2>
              <p className="mt-1 text-sm text-ink-500">{t(`steps.s${step.n}Desc`)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <TransparencyNotice variant="strong" title={t('how.reminderTitle')}>
          {t('how.reminderBody')}
        </TransparencyNotice>
      </div>

      <div className="mt-6 text-center">
        <Link to="/products" className="btn-primary px-6 py-3 text-base">
          {t('how.cta')}
        </Link>
      </div>
    </div>
  );
}
