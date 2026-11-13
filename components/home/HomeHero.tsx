'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/store';
import { ProductWithCategory } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';

interface HomeHeroProps {
  products?: ProductWithCategory[];
}

export function HomeHero({ products = [] }: HomeHeroProps) {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Take up to 3 featured products for dynamic slides
  const featuredSlides = useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  // Total slides = 1 (main brand banner) + featured products
  const totalSlides = 1 + featuredSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play interval (3.8s) - paused on hover or touch
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  // Touch handlers
  const minSwipeDistance = 45;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches && e.targetTouches.length > 0 && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches.length > 0 && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <section
      className="group relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-md bg-white select-none min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex items-stretch"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Track */}
      <div
        className="flex w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* =========================================================================
            SLIDE 0: BANNER CHỦ ĐẠO THƯƠNG HIỆU & BỘ SƯU TẬP 2026
            ========================================================================= */}
        <div className="min-w-full w-full flex-shrink-0 relative overflow-hidden flex items-center min-h-[420px] sm:min-h-[460px]">
          {/* Background Image */}
          <Image
            src="/screenshots/hero-banner.jpg"
            alt="Hero Banner Promo"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          {/* Smooth Gradient Mask for Left Content */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-xl p-6 sm:p-10 lg:p-12 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('home.badgeNew')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {t('home.heroTitlePart1')}{' '}
              <span className="text-indigo-600">{t('home.heroTitlePart2')}</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-medium line-clamp-3 sm:line-clamp-none">
              {t('home.heroSubtitle')}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('home.heroCtaProducts')}</span>
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/90 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 hover:border-slate-300 shadow-xs transition-all backdrop-blur-xs"
              >
                <span>{t('home.heroCtaExplore')}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-slate-800 ml-1">4.9/5</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="font-medium text-slate-600">
                {language === 'vi' ? '10.000+ khách hàng tin cậy' : 'Trusted by 10,000+ customers'}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'vi' ? 'Chính hãng 100%' : '100% Genuine'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SLIDES 1, 2, 3: CÁC SẢN PHẨM NỔI BẬT ĐƯỢC ĐẨY LÊN SLIDE SHOPEE-STYLE
            ========================================================================= */}
        {featuredSlides.map((prod, idx) => {
          const discountPercent =
            prod.discountPrice && prod.price > prod.discountPrice
              ? Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)
              : null;

          // Background gradients to create vibrant e-commerce look
          const gradientThemes = [
            'from-indigo-900 via-indigo-950 to-slate-950 text-white',
            'from-slate-900 via-purple-950 to-indigo-950 text-white',
            'from-blue-950 via-slate-900 to-indigo-900 text-white',
          ];
          const bgTheme = gradientThemes[idx % gradientThemes.length];

          return (
            <div
              key={prod.id}
              className={`min-w-full w-full flex-shrink-0 relative overflow-hidden bg-gradient-to-r ${bgTheme} flex items-center p-6 sm:p-10 lg:p-12 min-h-[420px] sm:min-h-[460px]`}
            >
              {/* Subtle Ambient Glow Effect */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left Column: Product Info & Promos */}
                <div className="md:col-span-7 space-y-3 sm:space-y-4">
                  {/* Category & Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black tracking-wide shadow-xs uppercase">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {language === 'vi' ? 'SIÊU DEAL NỔI BẬT' : 'FEATURED DEAL'}
                    </span>
                    {discountPercent ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-tight shadow-xs">
                        -{discountPercent}% OFF
                      </span>
                    ) : null}
                    <span className="text-xs text-indigo-200/80 font-semibold uppercase tracking-wider hidden sm:inline">
                      {prod.category?.name}
                    </span>
                  </div>

                  {/* Product Title */}
                  <Link href={`/products/${prod.slug}`} className="block group/title">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight group-hover/title:text-indigo-300 transition-colors line-clamp-2">
                      {prod.name}
                    </h2>
                  </Link>

                  {/* Rating & Review */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-amber-400 font-bold bg-white/10 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{prod.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-300">({prod.reviewCount} {language === 'vi' ? 'đánh giá' : 'reviews'})</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      {language === 'vi' ? 'Còn hàng' : 'In stock'}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-emerald-400 tracking-tight">
                      {prod.discountPrice ? formatCurrency(prod.discountPrice) : formatCurrency(prod.price)}
                    </span>
                    {prod.discountPrice ? (
                      <span className="text-sm sm:text-base font-mono line-through text-slate-400">
                        {formatCurrency(prod.price)}
                      </span>
                    ) : null}
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
                    >
                      <ShoppingBag className="w-4 h-4 text-indigo-600" />
                      <span>{language === 'vi' ? 'Xem sản phẩm ngay' : 'Shop Now'}</span>
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-xs"
                    >
                      <span>{language === 'vi' ? 'Xem tất cả deal' : 'All Deals'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: High Quality Product Showcase Visual */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md p-3 sm:p-4 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={prod.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                      alt={prod.name}
                      className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          CONTROLS: PREVIOUS / NEXT ARROWS (HOVER-TRIGGERED)
          ========================================================================= */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg backdrop-blur-sm flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-lg backdrop-blur-sm flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* =========================================================================
          PAGINATION INDICATORS: SHOPEE-STYLE PILL DOTS
          ========================================================================= */}
      {totalSlides > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-indigo-600 shadow-md ring-2 ring-white/60'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-300/80 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
