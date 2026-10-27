import { HomeCategoriesSection } from '@/components/home/HomeCategoriesSection';
import { HomeFeaturedSection } from '@/components/home/HomeFeaturedSection';
import { HomeHero } from '@/components/home/HomeHero';
import { HomePerks } from '@/components/home/HomePerks';
import { db } from '@/lib/db';

// SSG + ISR: revalidate every 60s
export const revalidate = 60;

export default async function HomePage() {
  const featuredProducts = await db.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    take: 8,
  });

  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <HomeHero />

      {/* 3 E-Commerce Store Perks & Utilities */}
      <HomePerks />

      {/* Featured Products */}
      <HomeFeaturedSection products={featuredProducts} />

      {/* Categories */}
      <HomeCategoriesSection categories={categories} />
    </div>
  );
}
