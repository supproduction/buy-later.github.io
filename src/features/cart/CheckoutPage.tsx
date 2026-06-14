import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DELIVERY_VIBES, type DeliveryVibe } from '../../types/order';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { Select } from '../../components/ui/Select';
import { useCartStore, selectCartTotal } from '../../stores/cart.store';
import { useOrderStore } from '../../stores/order.store';
import { useTranslation } from '../../i18n';
import {
  SUPPORTED_COUNTRIES,
  citiesForCountry,
  resolveLocation,
} from '../../data/locations';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const total = useCartStore(selectCartTotal);
  const createOrder = useOrderStore((s) => s.createOrder);
  const { t, formatCurrency } = useTranslation();

  const [vibe, setVibe] = useState<DeliveryVibe>('doesnt_matter');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [demoMode, setDemoMode] = useState(false);

  // Nothing to check out — bounce back to the cart.
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const currency = items[0]?.product.currency ?? 'EUR';
  // The typed city isn't in our static map — we'll fall back to a country route.
  const cityUnmapped =
    city.trim().length > 0 && resolveLocation(city, country).level !== 'city';

  function handleConfirm() {
    const order = createOrder({
      items,
      deliveryVibe: vibe,
      deliveryCity: city,
      deliveryCountry: country,
      currency,
      demoMode,
    });
    clearCart();
    navigate(`/orders/${order.id}`, { replace: true });
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title={t('checkout.title')} subtitle={t('checkout.subtitle')} />

      <fieldset className="card p-5">
        <legend className="px-1 text-base font-semibold text-ink-900">
          {t('checkout.vibeLegend')}
        </legend>
        <p className="mt-1 text-sm text-ink-500">{t('checkout.vibeHelp')}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {DELIVERY_VIBES.map((option) => {
            const selected = vibe === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border p-3 text-center text-sm transition-colors ${
                  selected
                    ? 'border-brand-500 bg-brand-50 text-brand-800'
                    : 'border-ink-200 hover:bg-ink-50'
                }`}
              >
                <input
                  type="radio"
                  name="delivery-vibe"
                  value={option.value}
                  checked={selected}
                  onChange={() => setVibe(option.value)}
                  className="sr-only"
                />
                <span aria-hidden="true" className="text-2xl">
                  {option.emoji}
                </span>
                {t(`vibes.${option.value}`)}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="card mt-4 p-5">
        <legend className="px-1 text-base font-semibold text-ink-900">
          {t('checkout.locationLegend')}
        </legend>
        <p className="mt-1 text-sm text-ink-500">{t('checkout.locationHelp')}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className="label">
              {t('checkout.country')}
            </label>
            <Select
              id="country"
              ariaLabel={t('checkout.country')}
              value={country}
              onChange={(v) => setCountry(v)}
              options={[
                { value: '', label: t('checkout.countryPlaceholder') },
                ...SUPPORTED_COUNTRIES.map((c) => ({ value: c, label: c })),
              ]}
            />
          </div>
          <div>
            <label htmlFor="city" className="label">
              {t('checkout.city')}
            </label>
            <input
              id="city"
              className="input"
              list="known-cities"
              autoComplete="off"
              placeholder={t('checkout.cityPlaceholder')}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <datalist id="known-cities">
              {citiesForCountry(country).map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        {cityUnmapped && (
          <p className="mt-3 text-xs text-amber-700">{t('checkout.cityUnknown')}</p>
        )}
      </fieldset>

      <div className="card mt-4 p-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-ink-600">{t('checkout.orderTotal')}</span>
          <span className="text-lg font-bold text-ink-900">
            {formatCurrency(total, currency)}
          </span>
        </div>

        <label className="mt-4 flex items-start gap-3 rounded-xl bg-ink-50 p-3 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-brand-600"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
          />
          <span>
            <span className="font-medium text-ink-800">{t('checkout.demoMode')}</span>
            <span className="block text-ink-500">{t('checkout.demoModeDesc')}</span>
          </span>
        </label>
      </div>

      <div className="mt-4">
        <TransparencyNotice variant="strong" title={t('checkout.transTitle')}>
          {t('checkout.transBody')}
        </TransparencyNotice>
      </div>

      <button type="button" className="btn-primary mt-4 w-full" onClick={handleConfirm}>
        {t('checkout.confirm')}
      </button>
    </div>
  );
}
