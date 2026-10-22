import React from 'react';
import { PackageSearch, Search, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface OrdersPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function OrdersLookupPage({ searchParams }: OrdersPageProps) {
  const { query = '' } = await searchParams;
  const trimmed = query.trim();

  let orders: any[] = [];
  if (trimmed) {
    orders = await db.order.findMany({
      where: {
        OR: [
          { orderNumber: { contains: trimmed } },
          { shippingPhone: { contains: trimmed } },
          { user: { email: { contains: trimmed } } },
        ],
      },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 sm:p-10 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
          <PackageSearch className="w-4 h-4" /> Tra Cứu Đơn Hàng Trực Tuyến
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Theo Dõi Tình Trạng Đơn Hàng Của Bạn
        </h1>
        <p className="text-indigo-200 text-xs sm:text-sm max-w-xl">
          Nhập mã đơn hàng (ví dụ: <span className="font-mono text-white">ORD-</span>), số điện thoại đặt hàng hoặc email để kiểm tra lộ trình vận chuyển và trạng thái thanh toán theo thời gian thực.
        </p>

        {/* Search form */}
        <form method="GET" action="/orders" className="pt-2">
          <div className="relative flex items-center max-w-xl">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="query"
              defaultValue={trimmed}
              placeholder="Nhập mã đơn hàng, số điện thoại hoặc email..."
              className="w-full pl-12 pr-28 py-3.5 bg-white text-slate-900 rounded-2xl shadow-lg border border-transparent focus:outline-hidden focus:ring-2 focus:ring-indigo-400 text-sm placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Tra cứu
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {trimmed && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-800">
            Kết quả tra cứu cho: <span className="text-indigo-600 font-mono">"{trimmed}"</span> ({orders.length} đơn)
          </h2>

          {orders.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <Clock className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-slate-700 font-bold text-sm">Không tìm thấy đơn hàng phù hợp</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Vui lòng kiểm tra lại mã đơn hàng hoặc số điện thoại đã sử dụng khi thanh toán. Nếu cần hỗ trợ thêm, vui lòng liên hệ hotline CSKH 1900 6868.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const createdDate = new Date(order.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-slate-900">
                            {order.orderNumber}
                          </span>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Đặt lúc {createdDate}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-500">Tổng thanh toán:</span>
                        <p className="text-base font-black font-mono text-emerald-600">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Items preview */}
                    <div className="divide-y divide-slate-100">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product?.thumbnail}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-slate-900">{item.product?.name}</p>
                              <p className="text-slate-400 text-[11px]">Số lượng: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-slate-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        Người nhận: <strong className="text-slate-800">{order.shippingName}</strong> ({order.shippingPhone})
                      </div>
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Xem chi tiết đơn hàng <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Helpful Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900">Cam Kết Hàng Chính Hãng 100%</h3>
            <p className="text-slate-500 leading-relaxed">
              Mọi sản phẩm bán ra đều có tem kích hoạt bảo hành điện tử chính hãng và hóa đơn VAT điện tử.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900">Giao Hàng Nhanh 2 - 3 Ngày</h3>
            <p className="text-slate-500 leading-relaxed">
              Đơn hàng được đóng gói tiêu chuẩn chống sốc chuyên dụng và giao hàng tận nơi toàn quốc qua đối tác vận chuyển uy tín.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
