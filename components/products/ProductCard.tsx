'use client';

import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { useLanguage } from '@/lib/i18n/store';
import { ProductWithCategory } from '@/lib/types';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface ProductCardProps {
  product: ProductWithCategory;
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();

  // Extract up to 2-3 images for card preview navigation
  const cardImages: string[] = useMemo(() => {
    let list: string[] = [];
    try {
      const parsed =
        typeof product.images === 'string'
          ? JSON.parse(product.images)
          : product.images;
      if (Array.isArray(parsed)) {
        list = parsed.filter(
          (item): item is string => typeof item === 'string' && item.trim().length > 0
        );
      }
    } catch {
      list = [];
    }
    if (product.thumbnail && !list.includes(product.thumbnail)) {
      list.unshift(product.thumbnail);
    }
    return list.length > 0 ? list.slice(0, 3) : [DEFAULT_FALLBACK_IMAGE];
  }, [product.images, product.thumbnail]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const currentDisplayImg = imgErrors[activeIdx]
    ? DEFAULT_FALLBACK_IMAGE
    : cardImages[activeIdx] || cardImages[0] || DEFAULT_FALLBACK_IMAGE;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const formattedDiscount = product.discountPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(product.discountPrice)
    : null;

  const discountPercent =
    product.discountPrice && product.price > product.discountPrice
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : null;

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
      {/* Image container with 2-3 images interactive preview */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square overflow-hidden bg-slate-50 border-b border-slate-100"
      >
        {/* Main preview image */}
        <img
          src={currentDisplayImg}
          alt={product.name}
          onError={() => setImgErrors((prev) => ({ ...prev, [activeIdx]: true }))}
          className="w-full h-full object-cover object-center transition-all duration-300 ease-out group-hover:scale-105"
        />

        {/* 2-3 images interactive dots indicator */}
        {cardImages.length > 1 && (
          <div
            className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {cardImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View image ${idx + 1}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                className={`transition-all duration-200 rounded-full cursor-pointer shadow-xs ${
                  activeIdx === idx
                    ? 'w-5 h-1.5 bg-indigo-600'
                    : 'w-1.5 h-1.5 bg-slate-300/80 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges: Featured & Discount */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          {product.isFeatured ? (
            <span className="inline-flex items-center gap-1 bg-slate-900/85 backdrop-blur-xs text-white font-bold text-[10px] tracking-wide px-2.5 py-0.5 rounded-full shadow-xs">
              ★ {t('common.featured')}
            </span>
          ) : (
            <span />
          )}

          {discountPercent ? (
            <span className="bg-rose-600 text-white font-black text-[11px] px-2 py-0.5 rounded-full shadow-xs tracking-tight">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-4.5 space-y-2.5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate max-w-[60%]">
            {product.category?.name}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal text-[10px]">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="block group-hover:text-indigo-600 transition-colors"
        >
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price & Add to Cart action */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-slate-100">
          <div className="flex flex-col">
            {formattedDiscount ? (
              <>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight leading-tight">
                  {formattedDiscount}
                </span>
                <span className="text-[11px] text-slate-400 line-through font-mono">
                  {formattedPrice}
                </span>
              </>
            ) : (
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight">
                {formattedPrice}
              </span>
            )}
          </div>

          <AddToCartButton
            productId={product.id}
            variant="primary"
            className="text-xs px-3 py-1.5 rounded-xl shadow-xs shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
