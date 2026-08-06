'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/lib/types';
import { Filter, ArrowUpDown } from 'lucide-react';

interface ProductFilterProps {
  categories: Category[];
}

export function ProductFilter({ categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl mb-8">
      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        <button
          onClick={() => updateFilters('category', '')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg shrink-0 transition-colors ${
            !currentCategory
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilters('category', cat.slug)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg shrink-0 transition-colors ${
              currentCategory === cat.slug
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort options */}
      <div className="flex items-center gap-2 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}
