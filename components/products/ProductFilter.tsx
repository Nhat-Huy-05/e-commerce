'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/store';
import { Filter, ArrowUpDown } from 'lucide-react';

interface ProductFilterProps {
  categories: Category[];
}

export function ProductFilter({ categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl mb-8 shadow-xs">
      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-indigo-600" />{' '}
          {language === 'vi' ? 'Lọc:' : 'Filter:'}
        </span>
        <button
          onClick={() => updateFilters('category', '')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-colors cursor-pointer ${
            !currentCategory
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {t('common.all')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilters('category', cat.slug)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-colors cursor-pointer ${
              currentCategory === cat.slug
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort options */}
      <div className="flex items-center gap-2 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
        <select
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="bg-slate-50 text-slate-800 border border-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
        >
          <option value="">
            {language === 'vi' ? 'Sắp xếp: Nổi bật' : 'Sort by: Featured'}
          </option>
          <option value="price-asc">
            {t('products.sortPriceLowHigh')}
          </option>
          <option value="price-desc">
            {t('products.sortPriceHighLow')}
          </option>
          <option value="rating">
            {t('products.sortRating')}
          </option>
        </select>
      </div>
    </div>
  );
}
