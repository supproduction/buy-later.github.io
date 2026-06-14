import { useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartStore, selectCartCount } from '../../stores/cart.store';
import { useTranslation } from '../../i18n';
import { NAV_ITEMS } from './nav-items';
import { LanguageSwitcher } from './LanguageSwitcher';

/** Desktop top navigation bar + brand + product search. Adapts on mobile. */
export function Header() {
  const cartCount = useCartStore(selectCartCount);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-ink-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${t('common.appName')} — ${t('nav.home')}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white font-bold">
            BL
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-base font-bold text-ink-900">{t('common.appName')}</span>
            <span className="text-[11px] font-medium text-ink-500">{t('common.tagline')}</span>
          </span>
        </Link>

        <form
          role="search"
          onSubmit={handleSearch}
          className="relative flex-1"
          aria-label={t('catalog.searchLabel')}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          >
            🔍
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('catalog.searchPlaceholder')}
            aria-label={t('catalog.searchLabel')}
            className="w-full rounded-xl border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </form>

        <div className="flex shrink-0 items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
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
