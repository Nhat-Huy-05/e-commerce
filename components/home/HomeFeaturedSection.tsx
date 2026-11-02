'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductWithCategory } from '@/lib/types';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useLanguage } from '@/lib/i18n/store';
import { ArrowRight, Flame, Percent, Sparkles, Star } from 'lucide-react';

interface HomeFeaturedSectionProps {
  products: ProductWithCategory[];
}

type TabType = 'all' | 'sale' | 'topRated';

export function HomeFeaturedSection({ products }: HomeFeaturedSectionProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'sale':
        return products.filter((p) => p.discountPrice !== null && p.discountPrice > 0);
      case 'topRated':
        return [...products].sort((a, b) => b.rating - a.rating).filter((p) => p.rating >= 4.0);
      case 'all':
      default:
        return products;
    }
  }, [products, activeTab]);

  return (
    <section className="space-y-6 pt-2">
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'TUYỂN CHỌN HÀNG ĐẦU' : 'TOP PICKS FOR YOU'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('home.featuredProductsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {t('home.featuredProductsSubtitle')}
          </p>
        </div>

        {/* Action Link & Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tabs */}
          <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{t('home.featuredTabAll')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sale')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'sale'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>{t('home.featuredTabSale')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('topRated')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'topRated'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>{t('home.featuredTabTopRated')}</span>
            </button>
          </div>

          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 ml-2 group"
          >
            <span>{t('home.viewAllProducts')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />

      {/* Mobile view all link */}
      <div className="sm:hidden text-center pt-2">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline"
        >
          <span>{t('home.viewAllProducts')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
