import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-ink-500">
        <p className="font-semibold text-ink-700">{t('footer.tagline')}</p>
        <p className="mt-1 max-w-prose">{t('footer.disclaimer')}</p>
        <nav aria-label="Legal" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/how-it-works" className="hover:text-brand-700">
            {t('footer.howItWorks')}
          </Link>
          <Link to="/privacy" className="hover:text-brand-700">
            {t('footer.privacy')}
          </Link>
          <Link to="/terms" className="hover:text-brand-700">
            {t('footer.terms')}
          </Link>
          <Link to="/settings" className="hover:text-brand-700">
            {t('footer.settings')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
