import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, ArrowRight, Package, MapPin, CreditCard } from 'lucide-react';
import { OrderPaymentSection } from '@/components/order/OrderPaymentSection';

// SSR Strategy: Order details are fetched in real-time for security and privacy
export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  // Read bank config server-side (env vars without NEXT_PUBLIC_ — never sent to client bundle)
  const bankConfig = {
    bankName: process.env.SEPAY_BANK_NAME || '',
    bankAccount: process.env.SEPAY_ACCOUNT_NO || '',
    accountHolder: process.env.SEPAY_ACCOUNT_NAME || '',
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 text-center shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Đặt hàng Thành công!
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">
            Mã đơn hàng: {order.orderNumber}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cảm ơn bạn đã trải nghiệm mua sắm. Đơn hàng được tạo vào {formattedDate}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left text-xs pt-4 border-t border-slate-200">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-600 font-bold mb-1">
              <MapPin className="w-4 h-4" /> Địa chỉ giao hàng
            </div>
            <p className="font-bold text-slate-900">{order.shippingName}</p>
            <p className="text-slate-500">{order.shippingPhone}</p>
            <p className="text-slate-500">{order.shippingAddress}, {order.shippingCity}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-600 font-bold mb-1">
              <CreditCard className="w-4 h-4" /> Thanh toán
            </div>
            <p className="font-bold text-slate-900 uppercase">{order.paymentMethod}</p>
            <p className="text-slate-500">
              Trạng thái:{' '}
              <span
                className={`font-bold uppercase ${
                  order.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-600'
                }`}
              >
                {order.paymentStatus}
              </span>
            </p>
            <p className="text-slate-500">
              Tổng tiền: <span className="text-emerald-600 font-mono font-extrabold">{formatCurrency(order.total)}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-600 font-bold mb-1">
              <Package className="w-4 h-4" /> Trạng thái vận chuyển
            </div>
            <p className="font-bold text-slate-900 uppercase">{order.status}</p>
            <p className="text-slate-500">Dự kiến giao: 2-3 ngày làm việc</p>
          </div>
        </div>

        {/* SePay VietQR Dynamic Payment & Status Polling Box */}
        <OrderPaymentSection
          orderId={order.id}
          orderNumber={order.orderNumber}
          total={order.total}
          initialPaymentStatus={order.paymentStatus}
          paymentMethod={order.paymentMethod || 'bank_transfer'}
          bankConfig={bankConfig}
        />

        {/* Ordered Items Table */}
        <div className="text-left space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Chi tiết sản phẩm đã chọn:</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.thumbnail}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg bg-white border border-slate-200"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{item.product.name}</p>
                    <p className="text-slate-500 text-[11px]">Đơn giá: {formatCurrency(item.price)} x {item.quantity}</p>
                  </div>
                </div>
                <span className="font-mono text-emerald-600 font-bold">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md"
          >
            Tiếp tục mua sắm <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
