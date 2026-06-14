import { LANGUAGES, useTranslation, type Lang } from '../../i18n';
import { Select } from '../ui/Select';

/** Compact language selector shown in the header (visible on all sizes). */
export function LanguageSwitcher({ className = 'w-36' }: { className?: string }) {
  const { lang, setLang, t } = useTranslation();

  return (
    <Select
      className={className}
      size="sm"
      leadingIcon="🌐"
      ariaLabel={t('lang.label')}
      value={lang}
      onChange={(v) => setLang(v as Lang)}
      options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
    />
  );
}
