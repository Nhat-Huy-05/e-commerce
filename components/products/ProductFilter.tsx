'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/store';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface ProductFilterProps {
  categories: Category[];
}

const SORT_OPTIONS = [
  { value: '', labelVi: 'Nổi bật', labelEn: 'Featured' },
  { value: 'price-asc', labelVi: 'Giá thấp → cao', labelEn: 'Price: Low → High' },
  { value: 'price-desc', labelVi: 'Giá cao → thấp', labelEn: 'Price: High → Low' },
  { value: 'rating', labelVi: 'Đánh giá cao nhất', labelEn: 'Top Rated' },
];

export function ProductFilter({ categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

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
    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 mb-8 shadow-xs space-y-3">
      {/* Row 1: Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => updateFilters('category', '')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all border cursor-pointer active:scale-95 select-none ${
            !currentCategory
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          {language === 'vi' ? 'Tất cả' : 'All'}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilters('category', cat.slug)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all border cursor-pointer active:scale-95 select-none ${
              currentCategory === cat.slug
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Row 2: Sort */}
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
          {language === 'vi' ? 'Sắp xếp theo:' : 'Sort by:'}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilters('sort', opt.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all border cursor-pointer active:scale-95 select-none ${
                currentSort === opt.value
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {language === 'vi' ? opt.labelVi : opt.labelEn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
