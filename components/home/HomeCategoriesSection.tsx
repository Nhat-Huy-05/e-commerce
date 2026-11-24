"use client";

import { useLanguage } from "@/lib/i18n/store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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

export function HomeCategoriesSection({
  categories,
}: HomeCategoriesSectionProps) {
  const { language, t } = useLanguage();

  return (
    <section id="categories" className="mb-12 scroll-mt-28">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-3 mb-6 border-b border-surface-container gap-2">
        <div>
          <span className="font-label-caps uppercase text-secondary font-semibold text-[11px]">
            Taxonomy of Devices
          </span>
          <h2 className="font-headline-lg text-on-surface tracking-tight mt-1 text-2xl md:text-3xl font-bold">
            {t("home.featuredCategoriesTitle")}
          </h2>
          <p className="font-body-sm text-on-surface-variant mt-1 text-xs sm:text-sm">
            {language === "vi"
              ? "Tìm kiếm thiết bị công nghệ phù hợp nhất theo từng nhu cầu sử dụng chuyên biệt"
              : t("home.featuredCategoriesSubtitle")}
          </p>
        </div>
        <div>
          <Link
            href="/products"
            className="font-label-caps uppercase text-on-surface hover:text-secondary inline-flex items-center gap-1.5 transition-colors text-xs font-semibold"
          >
            <span>
              {language === "vi"
                ? "Xem tất cả danh mục"
                : "View all categories"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Editorial Mosaic Grid (6 columns) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const productCount = String(cat._count.products).padStart(2, "0");
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group bg-surface-container-lowest p-4 flex flex-col justify-between hover:bg-surface-container-high transition-colors border border-surface-container rounded-sm shadow-2xs"
            >
              <div className="w-full aspect-square bg-surface-container-low mb-4 overflow-hidden relative flex items-center justify-center p-3 border border-surface-container/60">
                <img
                  src={
                    cat.image ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                  }
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-outline uppercase block mb-1">
                  {productCount} {language === "vi" ? "Sản phẩm" : "Items"}
                </span>
                <h3 className="font-title-md text-xs sm:text-sm leading-tight text-on-surface group-hover:text-secondary transition-colors font-semibold">
                  {cat.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
