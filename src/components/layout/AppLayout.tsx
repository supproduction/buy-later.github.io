import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { useTranslation } from '../../i18n';

/** Shared shell: top header (desktop), bottom nav (mobile), routed content. */
export function AppLayout() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        {t('footer.skip')}
      </a>
      <Header />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 lg:pb-12">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

function RouteFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center py-24 text-sm text-ink-400">
      {t('common.loading')}
    </div>
  );
}
