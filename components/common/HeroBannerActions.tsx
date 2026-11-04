'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/store';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function HeroBannerActions() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>{t('home.heroCtaProducts')}</span>
      </Link>

      <Link
        href="#categories"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-800 font-bold text-sm border border-slate-200 hover:border-slate-300 shadow-xs transition-all backdrop-blur-xs"
      >
        <span>{t('home.heroCtaExplore')}</span>
        <ArrowRight className="w-4 h-4 text-slate-500" />
      </Link>
    </div>
  );
}
