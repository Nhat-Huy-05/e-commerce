'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/store';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  _count: {
    products: number;
  };
}

interface HomeCategoriesSectionProps {
  categories: CategoryItem[];
}

export function HomeCategoriesSection({ categories }: HomeCategoriesSectionProps) {
  const { language, t } = useLanguage();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {t('home.featuredCategoriesTitle')}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {t('home.featuredCategoriesSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group flex flex-col p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-center space-y-2"
          >
            <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-slate-100 relative border border-slate-200">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1">
              {cat.name}
            </h4>
            <span className="text-[10px] text-slate-500 font-mono font-semibold">
              {cat._count.products} {language === 'vi' ? 'sản phẩm' : 'items'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
