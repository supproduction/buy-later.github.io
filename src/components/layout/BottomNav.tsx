import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useCartStore, selectCartCount } from '../../stores/cart.store';
import { useTranslation } from '../../i18n';
import { NAV_ITEMS } from './nav-items';

/** Mobile-first bottom navigation. Hidden on >= sm where the header nav shows. */
export function BottomNav() {
  const cartCount = useCartStore(selectCartCount);
  const { t } = useTranslation();

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-brand-700' : 'text-ink-500'
                }`
              }
            >
              <span className="relative">
                <Icon path={item.icon} className="h-6 w-6" />
                {item.to === '/cart' && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1 rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
              {t(`nav.${item.key}`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
