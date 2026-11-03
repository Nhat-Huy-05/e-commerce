import { HomeCategoriesSection } from '@/components/home/HomeCategoriesSection';
import { HomeFeaturedSection } from '@/components/home/HomeFeaturedSection';
import { HomeFlashDealsSection } from '@/components/home/HomeFlashDealsSection';
import { HomeHero } from '@/components/home/HomeHero';
import { HomePerks } from '@/components/home/HomePerks';
import { db } from '@/lib/db';

// SSG + ISR: revalidate every 60s
export const revalidate = 60;

export default async function HomePage() {
  // Query 1: Flash sale / discounted products
  const saleProducts = await db.product.findMany({
    where: {
      discountPrice: { not: null, gt: 0 },
    },
    include: { category: true },
    take: 8,
  });

  // Query 2: Featured & top-rated products
  const featuredProducts = await db.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { rating: 'desc' },
    take: 8,
  });

  // Query 3: Categories with product count
  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <HomeHero />

      {/* 4 Core Store Perks / Value Proposition Bar */}
      <HomePerks />

      {/* Categories Grid */}
      <HomeCategoriesSection categories={categories} />

      {/* Dedicated Flash Sale / Hot Deals Section */}
      <HomeFlashDealsSection products={saleProducts} />

      {/* Featured & Top-Rated Products Section */}
      <HomeFeaturedSection products={featuredProducts} />
    </div>
  );
}
