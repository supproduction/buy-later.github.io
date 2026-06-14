import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description?: string;
  emoji?: string;
  action?: { to: string; label: string };
}

export function EmptyState({ title, description, emoji = '🛒', action }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span aria-hidden="true" className="text-4xl">
        {emoji}
      </span>
      <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
      {description && <p className="max-w-sm text-sm text-ink-500">{description}</p>}
      {action && (
        <Link to={action.to} className="btn-primary mt-2">
          {action.label}
        </Link>
      )}
    </div>
  );
}
