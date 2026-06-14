import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { useTranslation } from '../../i18n';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t('notFound.title')} />
      <EmptyState
        emoji="🧭"
        title={t('notFound.cardTitle')}
        description={t('notFound.desc')}
        action={{ to: '/', label: t('notFound.back') }}
      />
    </div>
  );
}
