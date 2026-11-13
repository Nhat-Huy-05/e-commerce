'use client';

import { useAuth } from '@/lib/auth-store';
import { useLanguage } from '@/lib/i18n/store';
import { useCart } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Package,
  QrCode,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
  const searchParams = useSearchParams();
  const { items, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedParam = searchParams.get('items');
  const selectedIdList = selectedParam ? selectedParam.split(',').filter(Boolean) : null;
  const activeItems = selectedIdList && selectedIdList.length > 0
    ? items.filter((i) => selectedIdList.includes(i.productId))
    : items;

  const [formData, setFormData] = useState({
    shippingName: user?.name || '',
    shippingEmail: user?.email || '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingCountry: 'Việt Nam',
    shippingZipCode: '',
    paymentMethod: 'bank_transfer',
    notes: '',
  });

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Client-side authentication guard: redirect to Login if not logged in
  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) {
      const target = selectedParam ? `/checkout?items=${selectedParam}` : '/checkout';
      router.replace(`/login?redirect=${encodeURIComponent(target)}`);
    } else {
      setFormData((prev) => ({
        ...prev,
        shippingName: prev.shippingName || user.name || '',
        shippingEmail: prev.shippingEmail || user.email || '',
      }));
    }
  }, [hasHydrated, user, router, selectedParam]);

  const cartItemsDetailed = activeItems.map((item) => {
    const prod = products.find((p) => p.id === item.productId);
    const unitPrice = prod ? prod.discountPrice ?? prod.price : 0;
    return {
      ...item,
      product: prod,
      unitPrice,
      totalPrice: unitPrice * item.quantity,
    };
  });

  const totalQuantity = cartItemsDetailed.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItemsDetailed.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingFee = 0; // Miễn phí vận chuyển toàn quốc cho đơn hàng
  const grandTotal = subtotal + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      const target = selectedParam ? `/checkout?items=${selectedParam}` : '/checkout';
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
      return;
    }

    if (activeItems.length === 0) {
      setErrorMsg(
        language === 'vi'
          ? 'Không có sản phẩm nào được chọn để thanh toán.'
          : 'No products selected for checkout.'
      );
      return;
    }

    // Validation các trường bắt buộc (trừ mã bưu điện và ghi chú)
    if (!formData.shippingName.trim()) {
      setErrorMsg(language === 'vi' ? 'Vui lòng điền họ và tên người nhận.' : 'Please enter recipient name.');
      return;
    }
    if (!formData.shippingPhone.trim()) {
      setErrorMsg(language === 'vi' ? 'Vui lòng điền số điện thoại nhận hàng.' : 'Please enter recipient phone number.');
      return;
    }
    if (formData.shippingPhone.trim().length < 8) {
      setErrorMsg(
        language === 'vi'
          ? 'Số điện thoại không hợp lệ (tối thiểu 8 chữ số).'
          : 'Phone number must be at least 8 digits.'
      );
      return;
    }
    if (!formData.shippingEmail.trim()) {
      setErrorMsg(language === 'vi' ? 'Vui lòng điền email nhận thông tin đơn hàng.' : 'Please enter email.');
      return;
    }
    if (!formData.shippingCity.trim()) {
      setErrorMsg(language === 'vi' ? 'Vui lòng điền Tỉnh / Thành phố.' : 'Please enter city.');
      return;
    }
    if (!formData.shippingAddress.trim()) {
      setErrorMsg(language === 'vi' ? 'Vui lòng điền địa chỉ giao hàng chi tiết.' : 'Please enter shipping address.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        userId: user?.id,
        items: activeItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (language === 'vi' ? 'Đặt hàng thất bại' : 'Failed to place order'));
      }

      // Nếu chỉ thanh toán một số sản phẩm đã chọn thì chỉ xóa các sản phẩm đó
      if (selectedIdList && selectedIdList.length > 0 && selectedIdList.length < items.length) {
        selectedIdList.forEach((id: string) => removeItem(id));
      } else {
        clearCart();
      }
      router.push(`/orders/${data.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || (language === 'vi' ? 'Có lỗi xảy ra khi tạo đơn hàng' : 'An error occurred while creating order'));
    } finally {
      setSubmitting(false);
    }
  };

  if (activeItems.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500 bg-white border border-slate-200 rounded-3xl p-8">
        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900 mb-1">
          {language === 'vi' ? 'Chưa chọn sản phẩm nào' : 'No products selected'}
        </h3>
        <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
          {language === 'vi'
            ? 'Vui lòng quay lại Giỏ hàng để tích chọn các sản phẩm bạn muốn đặt mua.'
            : 'Please return to your Cart to select the products you wish to purchase.'}
        </p>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          {t('checkout.backToCart')} &rarr;
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* =========================================================================
          BÊN TRÁI: TÓM TẮT SẢN PHẨM & TỔNG TIỀN ĐƠN HÀNG (LG: 5 CỘT)
          ========================================================================= */}
      <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <span>{t('cart.orderSummary')}</span>
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              {cartItemsDetailed.length} {language === 'vi' ? 'sản phẩm' : 'items'} ({totalQuantity} {language === 'vi' ? 'món' : 'pcs'})
            </span>
          </div>

          {/* Danh sách sản phẩm mua */}
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {cartItemsDetailed.map(({ productId, quantity, product, unitPrice }) => (
              <div
                key={productId}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <img
                  src={
                    product?.thumbnail ||
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
                  }
                  alt={product?.name || 'Product'}
                  className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                    {product?.name || t('common.loading')}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                    <span>
                      {formatCurrency(unitPrice)}{' '}
                      <span className="text-slate-400 font-bold">x {quantity}</span>
                    </span>
                    <span className="font-mono text-xs text-rose-600 font-extrabold">
                      {formatCurrency(unitPrice * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chi tiết tính tiền */}
          <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{t('common.subtotal')}:</span>
              <span className="font-mono text-slate-900 font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1">
                {t('common.shipping')}:
                <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold uppercase">
                  Miễn phí
                </span>
              </span>
              <span className="font-mono text-emerald-600 font-bold">
                {shippingFee === 0 ? '0₫' : formatCurrency(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-sm font-extrabold text-slate-900 pt-3 border-t border-slate-200">
              <span>{t('common.total')}:</span>
              <span className="font-mono text-xl text-rose-600 font-black">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          {/* Quick trust badges */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Giao hàng toàn quốc</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BÊN PHẢI: THÔNG TIN GIAO HÀNG & PHẦN THANH TOÁN SEPAY (LG: 7 CỘT)
          ========================================================================= */}
      <div className="lg:col-span-7 space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Khối 1: Thông tin giao hàng */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>{t('checkout.shippingInfo')}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Họ và tên (Bắt buộc) */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t('checkout.fullName')} <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="shippingName"
                value={formData.shippingName}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Số điện thoại (Bắt buộc) */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t('checkout.phone')} <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="tel"
                name="shippingPhone"
                value={formData.shippingPhone}
                onChange={handleChange}
                placeholder="0987 654 321"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Email (Bắt buộc) */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t('checkout.email')} <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="email"
                name="shippingEmail"
                value={formData.shippingEmail}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Tỉnh / Thành phố (Bắt buộc) */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t('checkout.city')} <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleChange}
                placeholder="Hà Nội, TP. Hồ Chí Minh, Huế..."
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Địa chỉ chi tiết (Bắt buộc) */}
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                {t('checkout.address')} <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Số 123 Hà Nội"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Mã bưu điện (KHÔNG BẮT BUỘC) */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === 'vi' ? 'Mã bưu điện (Zip Code)' : 'Zip / Postal Code'}
              </label>
              <input
                type="text"
                name="shippingZipCode"
                value={formData.shippingZipCode}
                onChange={handleChange}
                placeholder="VD: 700000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Ghi chú đơn hàng (Tùy chọn) */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t('checkout.orderNotes')}{' '}
                <span className="text-slate-400 font-normal text-[11px]">
                  ({language === 'vi' ? 'Tùy chọn' : 'Optional'})
                </span>
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Giao giờ hành chính, gọi trước khi giao..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Khối 2: Phương thức thanh toán (Nổi bật thanh toán SePay) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>{t('checkout.paymentMethod')}</span>
            </h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" /> SePay VietQR 24/7
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Tùy chọn 1: SePay VietQR (Mặc định & Khuyên dùng) */}
            <label
              className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'bank_transfer'
                ? 'bg-indigo-50/70 border-indigo-600 shadow-sm ring-1 ring-indigo-100'
                : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-indigo-600 accent-indigo-600"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-indigo-600" />
                      {language === 'vi'
                        ? 'Chuyển khoản SePay VietQR (Tự động 24/7)'
                        : 'Automatic Bank Transfer (SePay VietQR)'}
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Khuyên dùng
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                    Quét mã QR qua mọi ứng dụng ngân hàng (Vietcombank, MB, Techcombank, ACB, MoMo...).
                    Hệ thống SePay tự động kiểm tra và kích hoạt đơn hàng tức thì không cần xác nhận thủ công.
                  </p>
                </div>
              </div>
            </label>

            {/* Tùy chọn 2: COD (Thanh toán khi nhận hàng) */}
            <label
              className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'cash'
                ? 'bg-indigo-50/70 border-indigo-600 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-indigo-600 accent-indigo-600"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-600" />
                    {t('checkout.cod')}
                  </span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Kiểm tra hàng và thanh toán tiền mặt trực tiếp cho nhân viên giao hàng.
                  </p>
                </div>
              </div>
            </label>

            {/* Tùy chọn 3: Thẻ tín dụng / Ghi nợ */}
            <label
              className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'credit_card'
                ? 'bg-indigo-50/70 border-indigo-600 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-indigo-600 accent-indigo-600"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    {t('checkout.creditCard')}
                  </span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Hỗ trợ thẻ Visa, Mastercard, JCB, thẻ ATM nội địa Napas.
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Nút Submit & Cam kết bảo mật */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              t('checkout.processing')
            ) : formData.paymentMethod === 'bank_transfer' ? (
              <>
                <QrCode className="w-5 h-5" />
                <span>Tiến hành thanh toán SePay VietQR ({formatCurrency(grandTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>{t('checkout.placeOrder')} ({formatCurrency(grandTotal)})</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'vi'
                ? 'Thông tin thanh toán được mã hóa an toàn 256-bit SSL'
                : 'Payment information is protected with 256-bit SSL encryption'}
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
