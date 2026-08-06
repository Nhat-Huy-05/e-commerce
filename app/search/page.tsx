import React from 'react';
import { db } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { RenderingBadge } from '@/components/common/RenderingBadge';

import { ProductWithCategory } from '@/lib/types';

// SSR Strategy: Force dynamic server-side rendering for every search query
export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const query = q.trim();

  let products: ProductWithCategory[] = [];
  if (query) {
    products = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        category: true,
      },
    });
  }

  return (
    <div className="space-y-6">
      <RenderingBadge
        strategy="SSR"
        revalidateSeconds={0}
        routeName={`app/search/page.tsx (query: "${query}")`}
        reason="Trang Tìm kiếm áp dụng Server-Side Rendering (SSR) 100% thời gian thực. Mỗi từ khóa tìm kiếm người dùng nhập vào là duy nhất và không thể dự đoán trước để pre-render tĩnh. SSR đảm bảo máy chủ thực hiện truy vấn trực tiếp vào Database và phản hồi kết quả mới nhất cho từng request."
      />

      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white">
          Kết quả tìm kiếm: <span className="text-indigo-400">"{query}"</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Tìm thấy {products.length} sản phẩm phù hợp với từ khóa (Xử lý trực tiếp bởi SSR)
        </p>
      </div>

      <ProductGrid
        products={products}
        emptyMessage={
          query
            ? `Không tìm thấy sản phẩm nào khớp với từ khóa "${query}".`
            : 'Vui lòng nhập từ khóa tìm kiếm trên thanh điều hướng.'
        }
      />
    </div>
  );
}
