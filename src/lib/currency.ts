/** Currency formatting helpers. Defaults to EUR to match product copy ("€X"). */

export function formatCurrency(amount: number, currency = 'EUR', locale?: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Unknown currency code — fall back to a plain number with the code.
    return `${amount.toFixed(2)} ${currency}`;
  }
}
