import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Prose } from './Prose';
import { useTranslation } from '../../i18n';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t('privacy.title')} subtitle={t('privacy.subtitle')} />
      <Prose>
        <p>{t('privacy.p1')}</p>

        <h2>{t('privacy.whatStored')}</h2>
        <ul>
          <li>
            {t('privacy.s1Pre')}
            <strong>{t('privacy.s1Bold')}</strong>
            {t('privacy.s1Post')}
          </li>
          <li>{t('privacy.s2')}</li>
          <li>{t('privacy.s3')}</li>
        </ul>

        <h2>{t('privacy.neverTitle')}</h2>
        <ul>
          <li>{t('privacy.n1')}</li>
          <li>{t('privacy.n2')}</li>
          <li>{t('privacy.n3')}</li>
          <li>{t('privacy.n4')}</li>
        </ul>

        <h2>{t('privacy.analyticsTitle')}</h2>
        <p>{t('privacy.analyticsBody')}</p>

        <h2>{t('privacy.clearTitle')}</h2>
        <p>
          {t('privacy.clearPre')}
          <Link to="/settings" className="text-brand-700 underline">
            {t('privacy.clearLink')}
          </Link>
          {t('privacy.clearPost')}
        </p>
      </Prose>
    </div>
  );
}
