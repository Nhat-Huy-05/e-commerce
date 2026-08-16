import { Suspense } from 'react';
import { ProductFilter } from '@/components/products/ProductFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { db } from '@/lib/db';

// ISR Strategy: Revalidate product listing cache every 30 seconds
export const revalidate = 30;

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = await searchParams;

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  if (sort === 'price-desc') orderBy = { price: 'desc' };
  if (sort === 'rating') orderBy = { rating: 'desc' };

  const where: any = {};
  if (category) {
    where.category = { slug: category };
  }

  const products = await db.product.findMany({
    where,
    orderBy,
    include: {
      category: true,
    },
  });

  const categories = await db.category.findMany({});

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Danh mục Sản phẩm</h1>
          <p className="text-xs text-slate-900 mt-1">
            Hiển thị {products.length} sản phẩm
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="h-16 bg-white border border-slate-200 rounded-2xl animate-pulse mb-8" />}>
        <ProductFilter categories={categories} />
      </Suspense>

      <ProductGrid products={products} />
    </div>
  );
}
