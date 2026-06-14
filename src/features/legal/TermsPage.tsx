import { PageHeader } from '../../components/ui/PageHeader';
import { Prose } from './Prose';
import { useTranslation } from '../../i18n';

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t('terms.title')} subtitle={t('terms.subtitle')} />
      <Prose>
        <h2>{t('terms.whatTitle')}</h2>
        <ul>
          <li>{t('terms.w1')}</li>
          <li>{t('terms.w2')}</li>
          <li>{t('terms.w3')}</li>
          <li>{t('terms.w4')}</li>
        </ul>

        <h2>{t('terms.prodTitle')}</h2>
        <ul>
          <li>{t('terms.p1')}</li>
          <li>{t('terms.p2')}</li>
        </ul>

        <h2>{t('terms.linksTitle')}</h2>
        <ul>
          <li>{t('terms.l1')}</li>
          <li>{t('terms.l2')}</li>
        </ul>

        <h2>{t('terms.warrantyTitle')}</h2>
        <p>{t('terms.warrantyBody')}</p>

        <h2>{t('terms.affTitle')}</h2>
        <p>{t('terms.affBody')}</p>
      </Prose>
    </div>
  );
}
