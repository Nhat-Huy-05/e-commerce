import { ProductFilter } from '@/components/products/ProductFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductsHeader } from '@/components/products/ProductsHeader';
import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { Suspense } from 'react';

const getProductsWithCache = unstable_cache(
  async (category: string | undefined, sort: string | undefined) => {
    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    if (sort === 'price-desc') orderBy = { price: 'desc' };
    if (sort === 'rating') orderBy = { rating: 'desc' };

    const where: any = {};
    if (category) {
      where.category = { slug: category };
    }

    return Promise.all([
      db.product.findMany({
        where,
        orderBy,
        include: { category: true },
      }),
      db.category.findMany({}),
    ]);
  },
  ['products-list'],
  { revalidate: 30, tags: ['products'] }
);

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = await searchParams;

  const [products, categories] = await getProductsWithCache(category, sort);

  return (
    <div className="space-y-6">
      <ProductsHeader count={products.length} />

      <Suspense fallback={<div className="h-16 bg-white border border-slate-200 rounded-2xl animate-pulse mb-8" />}>
        <ProductFilter categories={categories} />
      </Suspense>

      <ProductGrid products={products} />
    </div>
  );
}
