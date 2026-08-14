import { db } from '@/lib/db';
import { Package, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, images: true } },
        },
      },
    },
  });

  const statusMap: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200',
    shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-purple-600" />
            Quản lý Đơn hàng
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {orders.length} đơn hàng · Tổng doanh thu:{' '}
            <span className="text-emerald-600 font-bold">${totalRevenue.toFixed(2)}</span>
          </p>
        </div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Profile
        </Link>
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm">Chưa có đơn hàng nào.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono font-bold text-indigo-600 text-sm">
                    {ord.orderNumber}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(ord.createdAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                      statusMap[ord.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {ord.status}
                  </span>
                  <span className="font-mono font-extrabold text-emerald-600">
                    ${ord.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Customer info */}
              <div className="px-5 py-3 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">Thông tin khách hàng</p>
                  <p>
                    <span className="text-slate-400">Tên:</span>{' '}
                    <strong>{ord.shippingName}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400">Email:</span>{' '}
                    {ord.shippingEmail ?? ord.user?.email ?? '—'}
                  </p>
                  <p>
                    <span className="text-slate-400">SĐT:</span>{' '}
                    {ord.shippingPhone ?? '—'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">Địa chỉ giao hàng</p>
                  <p>{ord.shippingAddress}</p>
                  <p>
                    {ord.shippingCity}, {ord.shippingCountry}
                    {ord.shippingZipCode ? ` ${ord.shippingZipCode}` : ''}
                  </p>
                  <p>
                    <span className="text-slate-400">Thanh toán:</span>{' '}
                    <span className="uppercase font-semibold">{ord.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="px-5 py-3 space-y-2">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Sản phẩm đã mua ({ord.items.length})
                </p>
                {ord.items.map((item) => {
                  const rawImages = item.product.images;
                  const imagesArr: string[] = Array.isArray(rawImages)
                    ? rawImages
                    : (() => { try { return JSON.parse(rawImages as unknown as string); } catch { return []; } })();
                  const img = imagesArr[0] ?? null;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-200 shrink-0 flex items-center justify-center text-slate-400">
                          <Package className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Số lượng: {item.quantity} · Đơn giá: ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-indigo-600 text-sm shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
