import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { RenderingBadge } from '@/components/common/RenderingBadge';
import { DeleteProductButton } from './DeleteProductButton';
import { AdminPageHeader } from './AdminPageHeader';
import { Plus, Edit } from 'lucide-react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
    },
  });

  return (
    <div className="space-y-6">
      <RenderingBadge
        strategy="SSR"
        revalidateSeconds={0}
        routeName="app/admin/products/page.tsx"
        reason="Trang Quản trị Admin chạy ở chế độ Server-Side Rendering (SSR). Mọi thao tác Thêm/Sửa/Xóa sản phẩm tại đây sẽ gọi revalidatePath() ngay lập tức, giúp làm mới dữ liệu trên toàn bộ trang SSG/ISR mà không cần build lại dự án."
      />

      <div className="flex items-center justify-between gap-4">
        <AdminPageHeader totalProducts={products.length} />

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm mới
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-4 py-3.5">Sản phẩm</th>
              <th className="px-4 py-3.5">Danh mục</th>
              <th className="px-4 py-3.5">Giá bán</th>
              <th className="px-4 py-3.5">Tồn kho</th>
              <th className="px-4 py-3.5">Nổi bật</th>
              <th className="px-4 py-3.5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-100 flex items-center gap-3">
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-slate-200">{product.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">slug: {product.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-indigo-400">
                  {product.category.name}
                </td>
                <td className="px-4 py-3 font-mono font-bold text-emerald-400">
                  ${(product.discountPrice ?? product.price).toFixed(2)}
                  {product.discountPrice && (
                    <span className="block text-[10px] text-slate-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono">
                  {product.stock > 0 ? (
                    <span className="text-slate-200">{product.stock}</span>
                  ) : (
                    <span className="text-red-400 font-bold">Hết hàng</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {product.isFeatured ? (
                    <span className="text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                      Yes
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-1.5 rounded-lg bg-slate-800 text-indigo-400 hover:bg-slate-700 transition-colors"
                      title="Sửa sản phẩm"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
