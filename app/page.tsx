import { HomeCategoriesSection } from "@/components/home/HomeCategoriesSection";
import { HomeFeaturedSection } from "@/components/home/HomeFeaturedSection";
import { HomeFlashDealsSection } from "@/components/home/HomeFlashDealsSection";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeJournalBanner } from "@/components/home/HomeJournalBanner";
import { HomePerks } from "@/components/home/HomePerks";
import { db } from "@/lib/db";

// SSG + ISR: revalidate every 60s
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all home data concurrently to minimize network latency
  const [saleProducts, featuredProducts, categories] = await Promise.all([
    // Query 1: Flash sale / discounted products
    db.product.findMany({
      where: {
        discountPrice: { not: null, gt: 0 },
      },
      include: { category: true },
      take: 8,
    }),

    // Query 2: Featured & top-rated products
    db.product.findMany({
      where: { isFeatured: true },
      include: { category: true },
      orderBy: { rating: "desc" },
      take: 8,
    }),

    // Query 3: Categories with product count
    db.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    }),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Editorial Monograph */}
      <HomeHero products={featuredProducts} />

      {/* 2. Service Pledge Strip */}
      <HomePerks />

      {/* 3. Category Discovery Mosaic */}
      <HomeCategoriesSection categories={categories} />

      {/* 4. Deal Hot Giá Tốt (Countdown & Asymmetric Grid) */}
      <HomeFlashDealsSection products={saleProducts} />

      {/* 5. Curated Featured Products Matrix */}
      <HomeFeaturedSection products={featuredProducts} />

      {/* 6. Editorial Tech Journal Monograph */}
      <HomeJournalBanner />
    </div>
  );
}
