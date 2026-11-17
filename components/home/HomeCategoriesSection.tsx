'use client';

import { useLanguage } from '@/lib/i18n/store';
import Link from 'next/link';

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
    <section id="categories" className="space-y-6 scroll-mt-20">
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
            className="group flex flex-col p-3 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all text-center space-y-1.5"
          >
            <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden bg-slate-50 relative border border-slate-200 flex items-center justify-center p-1">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                alt={cat.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1">
              {cat.name}
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              {cat._count.products} {language === 'vi' ? 'sản phẩm' : 'items'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
