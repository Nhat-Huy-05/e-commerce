'use client';

import { useAuth } from '@/lib/auth-store';
import { useCart } from '@/lib/store';
import { CheckCircle2, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  thumbnail: string;
}

interface CheckoutFormProps {
  products: ProductInfo[];
}

export function CheckoutForm({ products }: CheckoutFormProps) {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    shippingName: user?.name || '',
    shippingEmail: user?.email || '',
    shippingPhone: '0987654321',
    shippingAddress: '',
    shippingCity: '',
    shippingCountry: 'Việt Nam',
    shippingZipCode: '',
    paymentMethod: 'credit_card',
    notes: '',
  });

  const cartItemsDetailed = items.map((item) => {
    const prod = products.find((p) => p.id === item.productId);
    const unitPrice = prod ? prod.discountPrice ?? prod.price : 0;
    return {
      ...item,
      product: prod,
      unitPrice,
      totalPrice: unitPrice * item.quantity,
    };
  });

  const subtotal = cartItemsDetailed.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingFee = subtotal > 0 ? (subtotal > 500 ? 0 : 15) : 0;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg('Giỏ hàng của bạn đang trống.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        userId: user?.id,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Đặt hàng thất bại');
      }

      clearCart();
      router.push(`/orders/${data.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">
        Giỏ hàng đang trống. Vui lòng quay lại chọn sản phẩm trước khi thanh toán.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Shipping Details */}
      <div className="lg:col-span-2 space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-600" /> Thông tin giao hàng
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Họ và Tên
              </label>
              <input
                type="text"
                name="shippingName"
                value={formData.shippingName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Email nhận thông báo
              </label>
              <input
                type="email"
                name="shippingEmail"
                value={formData.shippingEmail}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                name="shippingPhone"
                value={formData.shippingPhone}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Tỉnh / Thành phố
              </label>
              <input
                type="text"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Mã bưu chính <span className="text-slate-400 font-normal">(tuỳ chọn)</span>
              </label>
              <input
                type="text"
                name="shippingZipCode"
                value={formData.shippingZipCode}
                onChange={handleChange}
                placeholder="VD: 700000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                Địa chỉ chi tiết
              </label>
              <input
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" /> Phương thức thanh toán
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${formData.paymentMethod === 'credit_card'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={formData.paymentMethod === 'credit_card'}
                onChange={handleChange}
                className="hidden"
              />
              Thẻ Tín dụng / Visa
            </label>
            <label
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${formData.paymentMethod === 'bank_transfer'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={formData.paymentMethod === 'bank_transfer'}
                onChange={handleChange}
                className="hidden"
              />
              Chuyển khoản Ngân hàng
            </label>
            <label
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${formData.paymentMethod === 'cash'
                ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleChange}
                className="hidden"
              />
              Thanh toán khi nhận hàng (COD)
            </label>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md h-fit space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
          Sản phẩm mua ({items.length})
        </h3>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {cartItemsDetailed.map(({ productId, quantity, product, unitPrice }) => (
            <div key={productId} className="flex items-center gap-3 text-xs">
              <img
                src={product?.thumbnail}
                alt=""
                className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-semibold truncate">{product?.name}</p>
                <p className="text-slate-400 text-[11px]">x{quantity}</p>
              </div>
              <span className="font-mono text-emerald-600 font-bold">
                ${(unitPrice * quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Tạm tính:</span>
            <span className="font-mono text-slate-800 font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Vận chuyển:</span>
            <span className="font-mono text-slate-800 font-semibold">
              {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
            <span>Tổng cộng:</span>
            <span className="font-mono text-emerald-600">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {submitting ? (
            'Đang xử lý đơn hàng...'
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" /> Xác nhận Đặt hàng
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Thanh toán được bảo vệ và xử lý tức thì
        </p>
        {/*thanh toán được bảo vệ và xử lý tức thì bởi SSR */}
      </div>
    </form>
  );
}
