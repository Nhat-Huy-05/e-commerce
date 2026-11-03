'use client';

import Image from 'next/image';
import { HeroBannerActions } from '@/components/common/HeroBannerActions';
import { useLanguage } from '@/lib/i18n/store';
import { ShieldCheck, Star } from 'lucide-react';

export function HomeHero() {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md min-h-[420px] sm:min-h-[460px] flex items-center">
      {/* Full-width Background Image */}
      <Image
        src="/screenshots/hero-banner.jpg"
        alt="Hero Banner Promo"
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover object-center"
      />

      {/* Smooth Gradient Mask for Left Text Area */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />

      {/* High Contrast Banner Content */}
      <div className="relative z-10 max-w-xl p-8 sm:p-12 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold tracking-wide shadow-xs">
          <span>{t('home.badgeNew')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {t('home.heroTitlePart1')}{' '}
          <span className="text-indigo-600">
            {t('home.heroTitlePart2')}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
          {t('home.heroSubtitle')}
        </p>

        <HeroBannerActions />

        {/* Micro Trust & Social Proof Indicator */}
        <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-bold text-slate-800 ml-1">4.9/5</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="font-medium text-slate-600">
            {language === 'vi'
              ? 'Hơn 10.000+ khách hàng tin cậy'
              : 'Trusted by 10,000+ customers'}
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'vi' ? 'Chính hãng 100%' : '100% Genuine'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
