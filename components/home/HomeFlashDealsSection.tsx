"use client";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useLanguage } from "@/lib/i18n/store";
import { ProductWithCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Flame, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface HomeFlashDealsSectionProps {
  products: ProductWithCategory[];
}

export function HomeFlashDealsSection({
  products,
}: HomeFlashDealsSectionProps) {
  const { language, t } = useLanguage();

  // Active ticking countdown timer (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!products || products.length === 0) {
    return null;
  }

  // Pick hero deal (first item with high discount or headphone/speaker) + supporting deals (next 5 items)
  const heroDeal = products[0];
  const supportingDeals = products.slice(1, 6);

  const getDiscountPercent = (prod: ProductWithCategory) => {
    if (prod.discountPrice && prod.price > prod.discountPrice) {
      return Math.round(((prod.price - prod.discountPrice) / prod.price) * 100);
    }
    return null;
  };

  return (
    <section id="flash-deals" className="mb-12 scroll-mt-28">
      {/* Section Header with Live Status & Countdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 mb-6 border-b border-surface-container gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-caps text-error font-bold flex items-center gap-1 text-[11px]">
              <Flame className="w-3.5 h-3.5 fill-error text-error" />{" "}
              {language === "vi" ? "GIÁ TỐT HÔM NAY" : "TODAY SPECIAL"}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 bg-error-container/30 text-error font-label-caps text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5 animate-pulse" />
              {language === "vi" ? "Đang diễn ra" : "Live Now"}
            </span>
          </div>
          <h2 className="font-headline-lg text-on-surface tracking-tight text-2xl md:text-3xl font-bold">
            {t("home.flashSaleTitle")}
          </h2>
          <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm mt-0.5">
            {t("home.flashSaleSubtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 border border-surface-container rounded-sm shadow-2xs">
            <span className="font-label-caps text-[10px] text-outline mr-1 uppercase">
              {language === "vi" ? "Kết thúc sau:" : "Ends in:"}
            </span>
            <span className="bg-primary text-on-primary font-price-md text-xs px-1.5 py-0.5 font-bold rounded-xs">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-primary font-bold text-xs">:</span>
            <span className="bg-primary text-on-primary font-price-md text-xs px-1.5 py-0.5 font-bold rounded-xs">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-primary font-bold text-xs">:</span>
            <span className="bg-primary text-on-primary font-price-md text-xs px-1.5 py-0.5 font-bold rounded-xs">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

          <Link
            href="/products?sort=price-desc"
            className="font-label-caps uppercase text-error hover:text-on-surface inline-flex items-center gap-1 transition-colors font-bold text-xs"
          >
            <span>{t("home.viewAllDeals")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Asymmetric Deals Showcase: 1 Hero Spotlight + 5 Supporting Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Item 1: Wide Double-column Hero Deal */}
        {heroDeal && (
          <div className="md:col-span-2 lg:col-span-2 bg-surface-container-lowest p-6 flex flex-col justify-between group relative border border-surface-container rounded-sm shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-[10px] bg-primary text-on-primary px-2 py-0.5 uppercase tracking-wider font-semibold">
                ★ {t("common.featured")}
              </span>
              {getDiscountPercent(heroDeal) && (
                <span className="font-label-caps text-[11px] bg-error text-on-error px-2 py-0.5 uppercase font-bold">
                  -{getDiscountPercent(heroDeal)}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">
              <Link
                href={`/products/${heroDeal.slug}`}
                className="aspect-square bg-surface-container-low overflow-hidden relative flex items-center justify-center p-4 border border-surface-container/60"
              >
                <img
                  src={heroDeal.thumbnail}
                  alt={heroDeal.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] uppercase text-outline mb-1">
                  {heroDeal.category?.name}
                </span>
                <Link href={`/products/${heroDeal.slug}`}>
                  <h3 className="font-headline-sm text-base sm:text-lg text-on-surface mb-2 font-bold group-hover:text-secondary transition-colors line-clamp-2">
                    {heroDeal.name}
                  </h3>
                </Link>
                <p className="font-body-sm text-on-surface-variant mb-3 line-clamp-2 text-xs leading-relaxed">
                  {heroDeal.description}
                </p>
                <div className="flex items-center gap-1 text-amber-500 font-bold mb-3 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-on-surface font-title-md text-xs">
                    {heroDeal.rating.toFixed(1)}
                  </span>
                  <span className="text-outline font-normal font-mono text-[11px]">
                    ({heroDeal.reviewCount})
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-price-lg text-xl md:text-2xl text-error font-bold">
                    {formatCurrency(heroDeal.discountPrice || heroDeal.price)}
                  </span>
                  {heroDeal.discountPrice && (
                    <span className="font-price-md text-xs text-outline line-through">
                      {formatCurrency(heroDeal.price)}
                    </span>
                  )}
                </div>
                <AddToCartButton
                  productId={heroDeal.id}
                  variant="primary"
                  className="w-full py-2.5 bg-secondary hover:bg-primary text-white font-label-caps text-xs uppercase font-bold transition-colors flex items-center justify-center gap-2 rounded-sm"
                  showLabelOnMobile
                />
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between text-label-caps text-[10px] text-outline">
              <span>
                {language === "vi" ? "BẢO HÀNH 24 THÁNG" : "24-MONTH WARRANTY"}
              </span>
              <span className="text-secondary font-bold">
                {language === "vi"
                  ? `CÒN LẠI ${heroDeal.stock || 5} CHIẾC`
                  : `${heroDeal.stock || 5} UNITS LEFT`}
              </span>
            </div>
          </div>
        )}

        {/* Supporting Deal Items */}
        {supportingDeals.map((prod) => {
          const discountPercent = getDiscountPercent(prod);
          return (
            <div
              key={prod.id}
              className="bg-surface-container-lowest p-4 flex flex-col justify-between group border border-surface-container rounded-sm shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-label-caps text-[9px] bg-primary text-on-primary px-1.5 py-0.5 uppercase">
                    ★ {t("common.featured")}
                  </span>
                  {discountPercent && (
                    <span className="font-label-caps text-[10px] bg-error text-on-error px-1.5 py-0.5 font-bold">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
                <Link
                  href={`/products/${prod.slug}`}
                  className="aspect-square bg-surface-container-low overflow-hidden relative my-2 flex items-center justify-center p-3 border border-surface-container/60 block"
                >
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <span className="font-label-caps text-[9px] uppercase text-outline block mb-1">
                  {prod.category?.name}
                </span>
                <Link href={`/products/${prod.slug}`}>
                  <h3 className="font-title-md text-xs sm:text-sm leading-snug text-on-surface line-clamp-1 group-hover:text-secondary transition-colors font-semibold">
                    {prod.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 text-amber-500 text-xs my-1.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-on-surface font-semibold text-xs">
                    {prod.rating.toFixed(1)}
                  </span>
                  <span className="text-outline text-[10px] font-mono">
                    ({prod.reviewCount})
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container mt-2">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-price-md text-sm sm:text-base text-error font-bold">
                    {formatCurrency(prod.discountPrice || prod.price)}
                  </span>
                  {prod.discountPrice && (
                    <span className="font-mono text-[11px] text-outline line-through">
                      {formatCurrency(prod.price)}
                    </span>
                  )}
                </div>
                <AddToCartButton
                  productId={prod.id}
                  variant="primary"
                  className="w-full py-2 bg-secondary hover:bg-primary text-white font-label-caps text-[10px] uppercase font-bold transition-colors flex items-center justify-center gap-1.5 rounded-sm"
                  showLabelOnMobile
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
