import { LANGUAGES, useTranslation, type Lang } from '../../i18n';

/** Compact language selector shown in the header (visible on all sizes). */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useTranslation();

  return (
    <label className={`flex items-center gap-1.5 ${className}`}>
      <span className="sr-only">{t('lang.label')}</span>
      <span aria-hidden="true" className="text-ink-400">
        🌐
      </span>
      <select
        className="rounded-lg border border-ink-200 bg-white py-1.5 pl-2 pr-7 text-sm font-medium text-ink-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        aria-label={t('lang.label')}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
