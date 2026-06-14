import { LANGUAGES, useTranslation, type Lang } from '../../i18n';
import { Select } from '../ui/Select';

/** Compact icon-only language selector for the header. */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useTranslation();

  return (
    <Select
      className={className}
      iconOnly
      leadingIcon="🌐"
      ariaLabel={t('lang.label')}
      value={lang}
      onChange={(v) => setLang(v as Lang)}
      options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
    />
  );
}
