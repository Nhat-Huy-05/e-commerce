'use client';

import React from 'react';
import Link from 'next/link';
import { ProductWithCategory } from '@/lib/types';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/lib/i18n/store';
import { ArrowRight, Award } from 'lucide-react';

interface HomeFeaturedSectionProps {
  products: ProductWithCategory[];
}

export function HomeFeaturedSection({ products }: HomeFeaturedSectionProps) {
  const { language, t } = useLanguage();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>{language === 'vi' ? 'BÁN CHẠY & ĐÁNH GIÁ CAO' : 'TOP RATED & POPULAR'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('home.featuredProductsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {t('home.featuredProductsSubtitle')}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 group shrink-0"
        >
          <span>{t('home.viewAllProducts')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
