'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductWithCategory } from '@/lib/types';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: ProductWithCategory;
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

export function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.thumbnail || DEFAULT_FALLBACK_IMAGE);

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

  return (
    <div className="group relative flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-2xl">
      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="block relative w-full aspect-square overflow-hidden bg-slate-950">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(DEFAULT_FALLBACK_IMAGE)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
        {product.discountPrice && (
          <span className="absolute top-3 right-3 bg-red-600 text-white font-bold text-xs px-2 py-0.5 rounded-md shadow-md">
            SALE
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-indigo-400 font-medium mb-1.5">
          <span>{product.category.name}</span>
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        <Link href={`/products/${product.slug}`} className="block group-hover:text-indigo-400 transition-colors">
          <h3 className="text-base font-semibold text-slate-100 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-slate-800/80">
          <div className="flex flex-col">
            {formattedDiscount ? (
              <>
                <span className="text-lg font-bold text-emerald-400">{formattedDiscount}</span>
                <span className="text-xs text-slate-500 line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-slate-100">{formattedPrice}</span>
            )}
          </div>

          <AddToCartButton productId={product.id} variant="primary" />
        </div>
      </div>
    </div>
  );
}
