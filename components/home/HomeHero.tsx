'use client';

import { useLanguage } from '@/lib/i18n/store';
import { ProductWithCategory } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  Zap,
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
          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white lg:col-span-8 min-h-[340px] sm:min-h-[370px] lg:min-h-[360px] xl:min-h-[380px] flex items-stretch shadow-xs"
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
              transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <div className="min-w-full w-full flex-shrink-0 relative overflow-hidden flex items-center min-h-[340px] sm:min-h-[370px]">
              <Image
                src="/screenshots/hero-banner.jpg"
                alt="Hero Banner Promo"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent sm:w-3/4 pointer-events-none" />

              <div className="relative z-10 max-w-lg p-6 sm:p-8 lg:p-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600 text-white text-[11px] font-bold tracking-wide shadow-xs uppercase">
                  <span>{language === 'vi' ? 'SIÊU HỘI CÔNG NGHỆ 2026' : 'TECH FESTIVAL 2026'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {t('home.heroTitlePart1')}{' '}
                  <span className="text-indigo-600">{t('home.heroTitlePart2')}</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-2 sm:line-clamp-3">
                  {t('home.heroSubtitle')}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('home.heroCtaProducts')}</span>
                  </Link>
                  <Link
                    href="#categories"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs transition-colors"
                  >
                    <span>{t('home.heroCtaExplore')}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                {/* Trust indicator */}
                <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-bold text-slate-800 ml-0.5">4.9/5</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span>{language === 'vi' ? '10.000+ khách hàng tin cậy' : '10,000+ happy customers'}</span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'vi' ? 'Chính hãng 100%' : '100% Genuine'}
                  </span>
                </div>
              </div>
            </div>
            {featuredSlides.map((prod, idx) => {
              const discountPercent =
                prod.discountPrice && prod.price > prod.discountPrice
                  ? Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)
                  : null;

              const solidThemes = [
                'bg-slate-900 text-white',
                'bg-[#0f172a] text-white',
                'bg-[#1e1b4b] text-white',
                'bg-[#18181b] text-white',
              ];
              const bgTheme = solidThemes[idx % solidThemes.length];

              return (
                <div
                  key={prod.id}
                  className={`min-w-full w-full flex-shrink-0 relative overflow-hidden ${bgTheme} flex items-center p-6 sm:p-8 lg:p-10 min-h-[340px] sm:min-h-[370px]`}
                >
                  <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                    {/* Left Column: Product Information */}
                    <div className="md:col-span-7 space-y-2.5 sm:space-y-3">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold tracking-wide uppercase">
                          {language === 'vi' ? 'SIÊU SALE CÔNG NGHỆ' : 'TECH SALE'}
                        </span>
                        {discountPercent ? (
                          <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[11px] font-black tracking-tight">
                            -{discountPercent}%
                          </span>
                        ) : null}
                        <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider hidden sm:inline">
                          {prod.category?.name}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/products/${prod.slug}`} className="block group/title">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug group-hover/title:text-indigo-300 transition-colors line-clamp-2">
                          {prod.name}
                        </h2>
                      </Link>

                      {/* Ratings & Perks */}
                      <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <div className="flex items-center gap-1 text-amber-400 font-bold bg-white/10 px-2 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{prod.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[11px]">
                          ({prod.reviewCount} {language === 'vi' ? 'đánh giá' : 'reviews'})
                        </span>
                        <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-current" />
                          {language === 'vi' ? 'Freeship toàn quốc' : 'Free Nationwide Delivery'}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2.5 pt-0.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-tight">
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

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        <Link
                          href={`/products/${prod.slug}`}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-xs transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4 text-slate-900" />
                          <span>{language === 'vi' ? 'Xem sản phẩm ngay' : 'Shop Now'}</span>
                        </Link>
                        <Link
                          href="/products"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
                        >
                          <span>{language === 'vi' ? 'Xem thêm ưu đãi' : 'More Deals'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="md:col-span-5 flex items-center justify-center">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-xl overflow-hidden bg-white p-3 border border-slate-200/20 shadow-md hover:scale-105 transition-transform duration-200 flex items-center justify-center"
                      >
                        <img
                          src={
                            prod.thumbnail ||
                            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
                          }
                          alt={prod.name}
                          className="w-full h-full object-contain rounded-lg"
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
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm border border-slate-200 flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm border border-slate-200 flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {totalSlides > 1 && (
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-2 border border-white/10 pointer-events-auto">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full cursor-pointer transition-all duration-200 ${currentSlide === idx
                      ? 'w-2.5 h-2.5 bg-white ring-2 ring-red-500 shadow-xs'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
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
            className="group relative overflow-hidden rounded-xl bg-[#ee4d2d] hover:bg-[#e03d1d] text-white p-4 sm:p-5 flex flex-col justify-between border border-red-500 shadow-xs transition-colors"
          >
            <div className="space-y-1 relative z-10">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-300 text-slate-950 font-black text-[10px] tracking-wide uppercase">
                <Gift className="w-3 h-3" />
                <span>{language === 'vi' ? 'VOUCHER ĐỘC QUYỀN' : 'SPECIAL VOUCHER'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight tracking-tight">
                {language === 'vi' ? 'Giảm Ngay 500.000₫' : 'Save Up To $50'}
              </h3>
              <p className="text-[11px] text-white/90 line-clamp-1">
                {language === 'vi'
                  ? 'Đơn công nghệ từ 2 triệu • Số lượng có hạn'
                  : 'On orders over $200 • Limited quantity'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-white relative z-10">
              <span className="flex items-center gap-1 text-[11px] text-amber-200">
                <Tag className="w-3 h-3" /> {language === 'vi' ? 'Lấy mã ngay' : 'Claim now'}
              </span>
              <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white group-hover:text-red-600 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
          <Link
            href="/products"
            className="group relative overflow-hidden rounded-xl bg-slate-900 hover:bg-slate-800 text-white p-4 sm:p-5 flex flex-col justify-between border border-slate-800 shadow-xs transition-colors"
          >
            <div className="space-y-1 relative z-10">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[10px] tracking-wide uppercase">
                <Truck className="w-3 h-3" />
                <span>{language === 'vi' ? 'FREESHIP 0Đ' : 'FREE SHIPPING'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight tracking-tight">
                {language === 'vi' ? 'Giao Hỏa Tốc & 1 Đổi 1' : 'Fast Delivery & Warranty'}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-1">
                {language === 'vi'
                  ? 'Bảo hành chính hãng 1 đổi 1 tận nơi 30 ngày'
                  : '100% Genuine with 30-day replacement'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-white relative z-10">
              <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />{' '}
                {language === 'vi' ? 'Chính hãng 100%' : '100% Authentic'}
              </span>
              <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white group-hover:text-slate-900 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
