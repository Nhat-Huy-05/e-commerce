import { ProductGrid } from '@/components/products/ProductGrid';
import { db } from '@/lib/db';

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
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900">
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
