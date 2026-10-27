'use client';

import React from 'react';
import Link from 'next/link';
import { ProductWithCategory } from '@/lib/types';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/lib/i18n/store';
import { ArrowRight } from 'lucide-react';

interface HomeFeaturedSectionProps {
  products: ProductWithCategory[];
}

export function HomeFeaturedSection({ products }: HomeFeaturedSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {t('home.featuredProductsTitle')}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {t('home.featuredProductsSubtitle')}
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
        >
          <span>{t('home.viewAllProducts')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
