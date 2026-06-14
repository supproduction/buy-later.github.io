import { useState } from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/** Image with a graceful placeholder fallback for missing/broken URLs. */
export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`grid place-items-center bg-brand-50 text-brand-300 ${className}`}
        aria-hidden="true"
      >
        <span className="text-3xl">🛍️</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
