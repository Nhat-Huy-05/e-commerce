'use client';

import React from 'react';
import { ProductWithCategory } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { useLanguage } from '@/lib/i18n/store';

interface ProductGridProps {
  products: ProductWithCategory[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage,
}: ProductGridProps) {
  const { t } = useLanguage();

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-16 px-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <p className="text-sm text-slate-500 font-medium">
          {emptyMessage || t('products.noProductsFound')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
