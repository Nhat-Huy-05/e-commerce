'use client';

import { useLanguage } from '@/lib/i18n/store';
import { ProductWithCategory } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gift,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

  // Take up to 4 featured products for dynamic slides
  const featuredSlides = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  // Total slides = 1 (main brand campaign banner) + featured products
  const totalSlides = 1 + featuredSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play interval (4s) - smoothly paused on hover or touch
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  // Touch swipe handlers
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
    <section className="space-y-3.5 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        <div
          className="group relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white lg:col-span-8 min-h-[340px] sm:min-h-[380px] lg:min-h-[370px] xl:min-h-[390px] flex items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex w-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <div className="min-w-full w-full flex-shrink-0 relative overflow-hidden flex items-center min-h-[340px] sm:min-h-[380px]">
              {/* Background Promo Image */}
              <Image
                src="/screenshots/hero-banner.jpg"
                alt="Hero Banner Promo"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent sm:w-3/4 pointer-events-none" />

              <div className="relative z-10 max-w-lg p-6 sm:p-8 lg:p-10 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black tracking-wide shadow-xs uppercase">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'vi' ? 'ĐẶC QUYỀN MUA SẮM 2026' : 'SPECIAL PERKS 2026'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  {t('home.heroTitlePart1')}{' '}
                  <span className="text-indigo-600">{t('home.heroTitlePart2')}</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium line-clamp-2 sm:line-clamp-3">
                  {t('home.heroSubtitle')}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('home.heroCtaProducts')}</span>
                  </Link>
                  <Link
                    href="#categories"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 hover:border-slate-300 shadow-xs transition-all backdrop-blur-xs"
                  >
                    <span>{t('home.heroCtaExplore')}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                {/* Trust Social Proof */}
                <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-bold text-slate-800 ml-0.5">4.9/5</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="font-medium text-slate-600">
                    {language === 'vi' ? 'Hơn 10.000+ khách hàng tin cậy' : '10,000+ happy customers'}
                  </span>
                </div>
              </div>
            </div>

            {
              featuredSlides.map((prod, idx) => {
                const discountPercent =
                  prod.discountPrice && prod.price > prod.discountPrice
                    ? Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)
                    : null;

                const gradientThemes = [
                  'from-slate-950 via-indigo-950 to-slate-900',
                  'from-rose-950 via-slate-900 to-indigo-950',
                  'from-slate-900 via-blue-950 to-purple-950',
                  'from-indigo-950 via-slate-900 to-slate-950',
                ];
                const bgTheme = gradientThemes[idx % gradientThemes.length];

                return (
                  <div
                    key={prod.id}
                    className={`min-w-full w-full flex-shrink-0 relative overflow-hidden bg-gradient-to-r ${bgTheme} text-white flex items-center p-6 sm:p-8 lg:p-10 min-h-[340px] sm:min-h-[380px]`}
                  >
                    <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute right-1/3 -bottom-16 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                      <div className="md:col-span-7 space-y-2.5 sm:space-y-3.5">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] sm:text-xs font-black tracking-wide shadow-xs uppercase">
                            <Flame className="w-3 h-3 fill-current" />
                            {language === 'vi' ? 'SIÊU DEAL CÔNG NGHỆ' : 'HOT DEAL'}
                          </span>
                          {discountPercent ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black tracking-tight shadow-xs">
                              -{discountPercent}% OFF
                            </span>
                          ) : null}
                          <span className="text-[11px] text-indigo-200/90 font-semibold uppercase tracking-wider hidden sm:inline">
                            {prod.category?.name}
                          </span>
                        </div>

                        <Link href={`/products/${prod.slug}`} className="block group/title">
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug group-hover/title:text-indigo-300 transition-colors line-clamp-2">
                            {prod.name}
                          </h2>
                        </Link>

                        {/* Ratings & Highlights */}
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1 text-amber-400 font-bold bg-white/10 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-white/10">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{prod.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-slate-300 text-[11px]">
                            ({prod.reviewCount} {language === 'vi' ? 'đánh giá' : 'reviews'})
                          </span>
                          <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-current" />
                            {language === 'vi' ? 'Freeship 0Đ' : 'Free Ship'}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2.5 pt-0.5">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                            {prod.discountPrice
                              ? formatCurrency(prod.discountPrice)
                              : formatCurrency(prod.price)}
                          </span>
                          {prod.discountPrice ? (
                            <span className="text-xs sm:text-sm font-mono line-through text-slate-400">
                              {formatCurrency(prod.price)}
                            </span>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          <Link
                            href={`/products/${prod.slug}`}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
                          >
                            <ShoppingBag className="w-4 h-4 text-indigo-600" />
                            <span>{language === 'vi' ? 'Mua ngay giá sốc' : 'Shop Now'}</span>
                          </Link>
                          <Link
                            href="/products"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-xs"
                          >
                            <span>{language === 'vi' ? 'Xem thêm deal' : 'More Deals'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      <div className="md:col-span-5 flex items-center justify-center">
                        <Link
                          href={`/products/${prod.slug}`}
                          className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-3 sm:p-4 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={
                              prod.thumbnail ||
                              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
                            }
                            alt={prod.name}
                            className="w-full h-full object-contain rounded-xl drop-shadow-2xl"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {totalSlides > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {totalSlides > 1 && (
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 pointer-events-auto shadow-sm">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full cursor-pointer transition-all duration-300 ${currentSlide === idx
                      ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white ring-2 ring-white/60 shadow-md scale-110'
                      : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/40 hover:bg-white/80'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>


        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-3.5 lg:col-span-4">
          <Link
            href="/products?sort=price-desc"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 text-white p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1.5 relative z-10">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-300 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-xs">
                <Gift className="w-3 h-3" />
                <span>{language === 'vi' ? 'SIÊU VOUCHER' : 'MEGA VOUCHER'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight tracking-tight group-hover:text-amber-200 transition-colors">
                {language === 'vi' ? 'Giảm Ngay 500.000₫' : 'Save Up To $50'}
              </h3>
              <p className="text-[11px] text-white/90 line-clamp-1">
                {language === 'vi'
                  ? 'Áp dụng cho đơn hàng công nghệ từ 3 triệu'
                  : 'On orders over $300 for electronics'}
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs font-bold text-white relative z-10">
              <span className="flex items-center gap-1 text-[11px] text-amber-200">
                <Tag className="w-3 h-3" /> {language === 'vi' ? 'Lấy mã ngay' : 'Claim voucher'}
              </span>
              <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-rose-600 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link
            href="/products"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 text-white p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1.5 relative z-10">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-xs">
                <Truck className="w-3 h-3" />
                <span>{language === 'vi' ? 'FREESHIP 0Đ' : 'FREE SHIPPING'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight tracking-tight group-hover:text-indigo-200 transition-colors">
                {language === 'vi' ? 'Giao Hỏa Tốc 2H' : 'Fast 2-Hour Delivery'}
              </h3>
              <p className="text-[11px] text-white/90 line-clamp-1">
                {language === 'vi'
                  ? 'Bảo hành chính hãng 1 đổi 1 tận nơi'
                  : '100% Genuine with 1-to-1 warranty'}
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs font-bold text-white relative z-10">
              <span className="flex items-center gap-1 text-[11px] text-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />{' '}
                {language === 'vi' ? 'Chính hãng 100%' : '100% Authentic'}
              </span>
              <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-indigo-700 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
