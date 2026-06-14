import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES, type ProductCategory } from '../../types/product';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransparencyNotice } from '../../components/ui/TransparencyNotice';
import { useProductStore } from '../../stores/product.store';
import { useCartStore } from '../../stores/cart.store';
import { useTranslation } from '../../i18n';

interface FormErrors {
  title?: string;
  price?: string;
  productUrl?: string;
  imageUrl?: string;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function AddItemPage() {
  const navigate = useNavigate();
  const addProduct = useProductStore((s) => s.addProduct);
  const addItem = useCartStore((s) => s.addItem);
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [storeName, setStoreName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Tech');
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!title.trim()) next.title = t('addItem.errName');

    const priceValue = Number(price);
    if (price.trim() === '' || Number.isNaN(priceValue)) {
      next.price = t('addItem.errPriceReq');
    } else if (priceValue <= 0) {
      next.price = t('addItem.errPriceGt0');
    }

    if (productUrl.trim() && !isValidUrl(productUrl.trim())) {
      next.productUrl = t('addItem.errUrl');
    }
    if (imageUrl.trim() && !isValidUrl(imageUrl.trim())) {
      next.imageUrl = t('addItem.errUrl');
    }
    return next;
  }

  function handleSubmit(e: FormEvent, alsoAddToCart: boolean) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const product = addProduct({
      title,
      price: Number(price),
      storeName: storeName || undefined,
      productUrl: productUrl || undefined,
      imageUrl: imageUrl || undefined,
      category,
    });

    if (alsoAddToCart) {
      addItem(product);
      navigate('/cart');
    } else {
      navigate('/products');
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title={t('addItem.title')} subtitle={t('addItem.subtitle')} />

      <div className="mb-5">
        <TransparencyNotice title={t('addItem.manualTitle')}>
          {t('addItem.manualBody')}
        </TransparencyNotice>
      </div>

      <form className="card flex flex-col gap-4 p-5" noValidate>
        <div>
          <label htmlFor="title" className="label">
            {t('addItem.name')} <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
            required
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-xs text-rose-600">
              {errors.title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="label">
              {t('addItem.priceEur')} <span className="text-rose-500">*</span>
            </label>
            <input
              id="price"
              className="input"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? 'price-error' : undefined}
              required
            />
            {errors.price && (
              <p id="price-error" className="mt-1 text-xs text-rose-600">
                {errors.price}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="label">
              {t('addItem.category')}
            </label>
            <select
              id="category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(`categories.${c}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="store" className="label">
            {t('addItem.store')} <span className="text-ink-400">{t('common.optional')}</span>
          </label>
          <input
            id="store"
            className="input"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="productUrl" className="label">
            {t('addItem.productUrl')} <span className="text-ink-400">{t('common.optional')}</span>
          </label>
          <input
            id="productUrl"
            className="input"
            type="url"
            placeholder="https://…"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            aria-invalid={!!errors.productUrl}
            aria-describedby={errors.productUrl ? 'producturl-error' : undefined}
          />
          {errors.productUrl && (
            <p id="producturl-error" className="mt-1 text-xs text-rose-600">
              {errors.productUrl}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="imageUrl" className="label">
            {t('addItem.imageUrl')} <span className="text-ink-400">{t('common.optional')}</span>
          </label>
          <input
            id="imageUrl"
            className="input"
            type="url"
            placeholder="https://…"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            aria-invalid={!!errors.imageUrl}
            aria-describedby={errors.imageUrl ? 'imageurl-error' : undefined}
          />
          {errors.imageUrl && (
            <p id="imageurl-error" className="mt-1 text-xs text-rose-600">
              {errors.imageUrl}
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className="btn-secondary flex-1"
            onClick={(e) => handleSubmit(e, false)}
          >
            {t('addItem.saveCatalog')}
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            onClick={(e) => handleSubmit(e, true)}
          >
            {t('addItem.saveAndCart')}
          </button>
        </div>
      </form>
    </div>
  );
}
