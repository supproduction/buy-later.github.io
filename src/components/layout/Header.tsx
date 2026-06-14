import { Link, NavLink } from 'react-router-dom';
import { useCartStore, selectCartCount } from '../../stores/cart.store';
import { useTranslation } from '../../i18n';
import { NAV_ITEMS } from './nav-items';
import { LanguageSwitcher } from './LanguageSwitcher';

/** Desktop top navigation bar + brand. Hidden chrome adapts on mobile. */
export function Header() {
  const cartCount = useCartStore(selectCartCount);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-ink-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label={`${t('common.appName')} — ${t('nav.home')}`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white font-bold">
            BL
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold text-ink-900">{t('common.appName')}</span>
            <span className="text-[11px] font-medium text-ink-500">{t('common.tagline')}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-100'
                  }`
                }
              >
                {t(`nav.${item.key}`)}
                {item.to === '/cart' && cartCount > 0 && (
                  <span className="ml-1 rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
