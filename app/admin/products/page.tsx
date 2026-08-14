import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { DeleteProductButton } from './DeleteProductButton';
import { AdminPageHeader } from './AdminPageHeader';
import { Plus, Edit, DollarSign, ShoppingCart, Package, AlertTriangle } from 'lucide-react';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const [products, orders] = await Promise.all([
    db.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        orderItems: true,
      },
    }),
    db.order.findMany({
      select: {
        total: true,
        status: true,
      },
    }),
  ]);

  // Aggregate Sales & Revenue Statistics
  const validOrders = orders.filter((o) => o.status !== 'cancelled');
  const totalRevenue = validOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrdersCount = orders.length;

  const totalUnitsSold = products.reduce((sum, p) => {
    return sum + p.orderItems.reduce((acc, item) => acc + item.quantity, 0);
  }, 0);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminPageHeader totalProducts={products.length} />

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm mới
        </Link>
      </div>

      {/* KPI & Sales Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doanh thu */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Tổng Doanh Thu</p>
            <p className="text-xl font-black text-slate-900 font-mono">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Tổng đơn hàng */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-200 shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Tổng Đơn Hàng</p>
            <p className="text-xl font-black text-slate-900 font-mono">{totalOrdersCount} đơn</p>
          </div>
        </div>

        {/* Số lượng đã bán */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold border border-sky-200 shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Sản Phẩm Đã Bán</p>
            <p className="text-xl font-black text-slate-900 font-mono">{totalUnitsSold} cái</p>
          </div>
        </div>

        {/* Tồn kho thấp */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-200 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Tồn Kho Thấp (≤5)</p>
            <p className="text-xl font-black text-slate-900 font-mono">{lowStockCount} sản phẩm</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
        <table className="w-full text-left text-xs text-slate-800">
          <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-4 py-3.5">Sản phẩm</th>
              <th className="px-4 py-3.5">Danh mục</th>
              <th className="px-4 py-3.5">Giá bán</th>
              <th className="px-4 py-3.5">Tồn kho</th>
              <th className="px-4 py-3.5">Đã bán / Doanh số</th>
              <th className="px-4 py-3.5">Nổi bật</th>
              <th className="px-4 py-3.5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const unitsSold = product.orderItems.reduce((acc, item) => acc + item.quantity, 0);
              const productRevenue = product.orderItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              );

              return (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-slate-900 font-bold">{product.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">slug: {product.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-indigo-600">
                    {product.category.name}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">
                    ${(product.discountPrice ?? product.price).toFixed(2)}
                    {product.discountPrice && (
                      <span className="block text-[10px] text-slate-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {product.stock > 0 ? (
                      <span className={`font-semibold ${product.stock <= 5 ? 'text-amber-600 font-bold' : 'text-slate-800'}`}>
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">Hết hàng</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900">{unitsSold} đã bán</span>
                      {productRevenue > 0 && (
                        <p className="text-[10px] text-emerald-600 font-semibold">
                          ${productRevenue.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {product.isFeatured ? (
                      <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                        Yes
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-100 text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Sửa sản phẩm"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
