'use client';

import React from 'react';
import Link from 'next/link';
import { ProductWithCategory } from '@/lib/types';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/lib/i18n/store';
import { ArrowRight, Flame, Timer } from 'lucide-react';

interface HomeFlashDealsSectionProps {
  products: ProductWithCategory[];
}

export function HomeFlashDealsSection({ products }: HomeFlashDealsSectionProps) {
  const { language, t } = useLanguage();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-rose-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>{language === 'vi' ? 'GIÁ TỐT HÔM NAY' : 'LIMITED TIME OFFER'}</span>
            <span className="w-1 h-1 rounded-full bg-rose-400" />
            <span className="flex items-center gap-1 font-mono text-[11px] text-rose-600">
              <Timer className="w-3 h-3" />
              {language === 'vi' ? 'Đang diễn ra' : 'Ending soon'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('home.flashSaleTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {t('home.flashSaleSubtitle')}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 group shrink-0"
        >
          <span>{t('home.viewAllDeals')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}

