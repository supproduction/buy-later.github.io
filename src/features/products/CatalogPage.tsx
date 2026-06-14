import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES, type ProductCategory } from '../../types/product';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { ProductCard } from '../../components/product/ProductCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { useProducts } from '../../hooks/useProducts';
import { useVirtualBuy } from '../../hooks/useVirtualBuy';
import { useTranslation } from '../../i18n';

type SortOption = 'relevance' | 'price-asc' | 'price-desc';

export default function CatalogPage() {
  const { products, isLoading, usingFallback } = useProducts();
  const { addToCart, virtualBuyNow } = useVirtualBuy();
  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('relevance');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesQuery = q === '' || p.title.toLowerCase().includes(q);
      const matchesCategory = category === 'all' || p.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, category, sort]);

  return (
    <div>
      <PageHeader title={t('catalog.title')} subtitle={t('catalog.subtitle')}>
        <Link to="/products/new" className="btn-primary">
          {t('catalog.addOwn')}
        </Link>
      </PageHeader>

      <div className="mb-4">
        <TransparencyNotice>{t('catalog.transparency')}</TransparencyNotice>
      </div>

      {usingFallback && (
        <div className="mb-4">
          <TransparencyNotice title={t('catalog.fallbackTitle')}>
            {t('catalog.fallbackBody')}
          </TransparencyNotice>
        </div>
      )}

      <div className="card mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="label">
            {t('catalog.searchLabel')}
          </label>
          <input
            id="search"
            type="search"
            className="input"
            placeholder={t('catalog.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="sm:w-44">
          <label htmlFor="category" className="label">
            {t('catalog.categoryLabel')}
          </label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory | 'all')}
          >
            <option value="all">{t('catalog.allCategories')}</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t(`categories.${c}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-44">
          <label htmlFor="sort" className="label">
            {t('catalog.sortLabel')}
          </label>
          <select
            id="sort"
            className="input"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="relevance">{t('catalog.sortFeatured')}</option>
            <option value="price-asc">{t('catalog.sortAsc')}</option>
            <option value="price-desc">{t('catalog.sortDesc')}</option>
          </select>
        </div>
      </div>

      {isLoading && products.length === 0 ? (
        <SkeletonGrid />
      ) : visible.length === 0 ? (
        <EmptyState
          emoji="🔍"
          title={t('catalog.emptyTitle')}
          description={t('catalog.emptyDesc')}
          action={{ to: '/products/new', label: t('catalog.emptyCta') }}
        />
      ) : (
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onVirtualBuy={virtualBuyNow}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Placeholder grid shown while the live catalog loads. */
function SkeletonGrid() {
  return (
    <ul
      className="grid grid-cols-2 gap-4 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="card overflow-hidden">
          <div className="aspect-square w-full animate-pulse bg-ink-100" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-ink-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-ink-100" />
            <div className="mt-3 h-9 w-full animate-pulse rounded-xl bg-ink-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}
