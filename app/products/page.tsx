import React from 'react';
import { db } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';
import { RenderingBadge } from '@/components/common/RenderingBadge';

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
      <RenderingBadge
        strategy="ISR"
        revalidateSeconds={30}
        routeName="app/products/page.tsx"
        reason="Danh sách sản phẩm được áp dụng Incremental Static Regeneration (ISR) với chu kỳ 30s. Trang phục vụ các yêu cầu xem danh sách từ bộ nhớ đệm tĩnh cực nhanh, đồng thời tự động cập nhật sản phẩm mới/giá mới trong nền khi hết thời gian 30s."
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Danh mục Sản phẩm</h1>
          <p className="text-xs text-slate-400 mt-1">
            Hiển thị {products.length} sản phẩm (Trang được cached với ISR 30 giây)
          </p>
        </div>
      </div>

      <ProductFilter categories={categories} />

      <ProductGrid products={products} />
    </div>
  );
}
