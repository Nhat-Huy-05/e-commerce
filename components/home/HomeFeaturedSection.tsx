"use client";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useLanguage } from "@/lib/i18n/store";
import { ProductWithCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

interface HomeFeaturedSectionProps {
  products: ProductWithCategory[];
}

export function HomeFeaturedSection({ products }: HomeFeaturedSectionProps) {
  const { language, t } = useLanguage();

  // Find ergonomic chair or highest rated item as the Left Lead Editorial Monograph
  const { leadProduct, gridProducts } = useMemo(() => {
    if (!products.length) return { leadProduct: null, gridProducts: [] };
    const list = [...products];
    const chairIdx = list.findIndex(
      (p) =>
        p.slug.includes("chair") ||
        p.name.toLowerCase().includes("chair") ||
        p.slug.includes("home-office"),
    );
    let lead = list[0];
    if (chairIdx > -1 && list[chairIdx]) {
      const [chair] = list.splice(chairIdx, 1);
      if (chair) lead = chair;
    } else {
      lead = list.shift()!;
    }
    return { leadProduct: lead, gridProducts: list.slice(0, 4) };
  }, [products]);

  if (!leadProduct) {
    return null;
  }

  const getDiscountPercent = (prod: ProductWithCategory) => {
    if (prod.discountPrice && prod.price > prod.discountPrice) {
      return Math.round(((prod.price - prod.discountPrice) / prod.price) * 100);
    }
    return null;
  };

  const leadDiscount = getDiscountPercent(leadProduct);

  return (
    <section id="featured-products" className="mb-12 scroll-mt-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-3 mb-6 border-b border-surface-container gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span className="font-label-caps uppercase text-secondary font-semibold text-[11px]">
              {language === "vi"
                ? "BÁN CHẠY & ĐÁNH GIÁ CAO"
                : "BESTSELLING & TOP RATED"}
            </span>
          </div>
          <h2 className="font-headline-lg text-on-surface tracking-tight text-2xl md:text-3xl font-bold">
            {t("home.featuredProductsTitle")}
          </h2>
          <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm mt-0.5">
            {language === "vi"
              ? "Tuyển chọn những thiết bị công nghệ & phụ kiện được yêu thích nhất từ đội ngũ biên tập NextCommerce"
              : t("home.featuredProductsSubtitle")}
          </p>
        </div>
        <div>
          <Link
            href="/products"
            className="font-label-caps uppercase text-secondary hover:text-on-surface inline-flex items-center gap-1.5 transition-colors font-bold text-xs"
          >
            <span>{t("home.viewAllProducts")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Curated Workspace & Computing Editorial Display (4 : 8 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Editorial Highlight Card (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 flex flex-col justify-between group border border-surface-container rounded-sm shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-[10px] bg-primary text-on-primary px-2 py-0.5 uppercase tracking-wider font-semibold">
                ★ {language === "vi" ? "BÁN CHẠY NHẤT" : "BESTSELLER"}
              </span>
              {leadDiscount && (
                <span className="font-label-caps text-[11px] bg-error text-on-error px-2 py-0.5 uppercase font-bold">
                  -{leadDiscount}%
                </span>
              )}
            </div>

            <Link
              href={`/products/${leadProduct.slug}`}
              className="aspect-[4/3] bg-surface-container-low overflow-hidden relative my-4 flex items-center justify-center p-4 border border-surface-container/60 block"
            >
              <img
                src={leadProduct.thumbnail}
                alt={leadProduct.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            <span className="font-label-caps text-[10px] uppercase text-outline block mb-1">
              {leadProduct.category?.name || "HOME OFFICE & DESK ESSENTIALS"}
            </span>
            <Link href={`/products/${leadProduct.slug}`}>
              <h3 className="font-headline-sm text-base sm:text-lg text-on-surface mb-2 font-bold group-hover:text-secondary transition-colors">
                {leadProduct.name}
              </h3>
            </Link>
            <p className="font-body-sm text-on-surface-variant mb-4 text-xs leading-relaxed line-clamp-3">
              {leadProduct.description}
            </p>

            <div className="flex items-center gap-1 text-amber-500 font-bold mb-4 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-on-surface font-title-md text-xs">
                {leadProduct.rating.toFixed(1)}
              </span>
              <span className="text-outline font-normal font-mono text-[11px]">
                ({leadProduct.reviewCount}{" "}
                {language === "vi" ? "đánh giá thực tế" : "verified reviews"})
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container">
            <div className="flex items-baseline justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="font-price-lg text-xl md:text-2xl text-on-surface font-bold">
                  {formatCurrency(
                    leadProduct.discountPrice || leadProduct.price,
                  )}
                </span>
                {leadProduct.discountPrice && (
                  <span className="font-price-md text-xs text-outline line-through">
                    {formatCurrency(leadProduct.price)}
                  </span>
                )}
              </div>
              <span className="font-label-caps text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 font-bold uppercase border border-emerald-200">
                {language === "vi" ? "SẴN HÀNG" : "IN STOCK"}
              </span>
            </div>
            <AddToCartButton
              productId={leadProduct.id}
              variant="primary"
              className="w-full py-3 bg-secondary hover:bg-primary text-white font-label-caps text-xs uppercase font-bold transition-colors flex items-center justify-center gap-2 rounded-sm"
              showLabelOnMobile
            />
          </div>
        </div>

        {/* Right 4-Product Balanced Matrix (8 cols: 2x2 grid) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gridProducts.map((prod) => {
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
                    {discountPercent ? (
                      <span className="font-label-caps text-[10px] bg-error text-on-error px-1.5 py-0.5 font-bold">
                        -{discountPercent}%
                      </span>
                    ) : (
                      <span className="font-label-caps text-[10px] text-outline font-mono">
                        TOP RATED
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${prod.slug}`}
                    className="aspect-[16/10] bg-surface-container-low overflow-hidden relative my-2 flex items-center justify-center p-3 border border-surface-container/60 block"
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
                    <h4 className="font-title-md text-xs sm:text-sm leading-snug text-on-surface line-clamp-1 group-hover:text-secondary transition-colors font-semibold">
                      {prod.name}
                    </h4>
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
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-price-md text-sm sm:text-base text-on-surface font-bold">
                        {formatCurrency(prod.discountPrice || prod.price)}
                      </span>
                      {prod.discountPrice && (
                        <span className="font-mono text-[11px] text-outline line-through">
                          {formatCurrency(prod.price)}
                        </span>
                      )}
                    </div>
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
      </div>
    </section>
  );
}
