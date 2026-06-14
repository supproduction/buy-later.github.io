import { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';
import { clearAppData } from '../../lib/storage';
import { track } from '../../lib/analytics';
import { useProductStore } from '../../stores/product.store';
import { useCartStore } from '../../stores/cart.store';
import { useOrderStore } from '../../stores/order.store';
import { useCommunityStore } from '../../stores/community.store';
import { useTranslation } from '../../i18n';

export default function SettingsPage() {
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);
  const { t } = useTranslation();

  function handleClear() {
    // Reset in-memory store state, then wipe persisted keys.
    useCartStore.setState({ items: [] });
    useProductStore.setState({ customProducts: [] });
    useOrderStore.getState().clearAll();
    useCommunityStore.setState({ watch: [], reflections: {} });
    clearAppData();
    track('app_data_cleared');
    setConfirming(false);
    setCleared(true);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <PageHeader title={t('settings.title')} subtitle={t('settings.subtitle')} />

      <section className="card p-6">
        <h2 className="text-base font-semibold text-ink-900">{t('settings.langTitle')}</h2>
        <p className="mt-1 text-sm text-ink-500">{t('settings.langBody')}</p>
        <div className="mt-4">
          <LanguageSwitcher />
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-base font-semibold text-ink-900">{t('settings.dataTitle')}</h2>
        <p className="mt-1 text-sm text-ink-500">{t('settings.dataBody')}</p>

        {cleared && (
          <div className="mt-4">
            <TransparencyNotice title={t('settings.clearedTitle')}>
              {t('settings.clearedBody')}
            </TransparencyNotice>
          </div>
        )}

        <div className="mt-5">
          {!confirming ? (
            <button
              type="button"
              className="btn-danger"
              onClick={() => {
                setCleared(false);
                setConfirming(true);
              }}
            >
              {t('settings.clearBtn')}
            </button>
          ) : (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-sm font-medium text-rose-900">{t('settings.confirmQuestion')}</p>
              <div className="mt-3 flex gap-2">
                <button type="button" className="btn-danger" onClick={handleClear}>
                  {t('settings.confirmYes')}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setConfirming(false)}
                >
                  {t('settings.cancel')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
