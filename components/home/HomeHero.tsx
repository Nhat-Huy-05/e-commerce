'use client';

import React from 'react';
import { HeroAuthSection } from '@/components/common/HeroAuthSection';
import { HeroBannerActions } from '@/components/common/HeroBannerActions';
import { useLanguage } from '@/lib/i18n/store';
import { Sparkles } from 'lucide-react';

export function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md min-h-[400px] sm:min-h-[440px] flex items-center">
      {/* Full-width Background Image */}
      <img
        src="/hero-banner.jpg"
        alt="Hero Banner Promo"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Smooth Gradient Mask for Left Text Area */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-2/3 lg:w-1/2 pointer-events-none" />

      {/* High Contrast Banner Content */}
      <div className="relative z-10 max-w-xl p-8 sm:p-12 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> {t('home.badgeNew')}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {t('home.heroTitlePart1')}{' '}
          <span className="text-indigo-600">
            {t('home.heroTitlePart2')}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
          {t('home.heroSubtitle')}
        </p>

        <HeroBannerActions />

        <HeroAuthSection />
      </div>
    </section>
  );
}
