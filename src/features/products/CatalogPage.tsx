import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCT_CATEGORIES, type ProductCategory } from '../../types/product';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { Select } from '../../components/ui/Select';
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

  // Search lives in the URL (?q=) so the header search bar and this page stay
  // in sync and queries are shareable.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const setQuery = (value: string) =>
    setSearchParams(
      (prev) => {
        if (value) prev.set('q', value);
        else prev.delete('q');
        return prev;
      },
      { replace: true },
    );

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
          <Select
            id="category"
            ariaLabel={t('catalog.categoryLabel')}
            value={category}
            onChange={(v) => setCategory(v as ProductCategory | 'all')}
            options={[
              { value: 'all', label: t('catalog.allCategories') },
              ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`) })),
            ]}
          />
        </div>
        <div className="sm:w-44">
          <label htmlFor="sort" className="label">
            {t('catalog.sortLabel')}
          </label>
          <Select
            id="sort"
            ariaLabel={t('catalog.sortLabel')}
            value={sort}
            onChange={(v) => setSort(v as SortOption)}
            options={[
              { value: 'relevance', label: t('catalog.sortFeatured') },
              { value: 'price-asc', label: t('catalog.sortAsc') },
              { value: 'price-desc', label: t('catalog.sortDesc') },
            ]}
          />
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
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
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
