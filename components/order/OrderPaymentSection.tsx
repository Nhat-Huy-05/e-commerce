'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';
import {
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  QrCode,
  AlertCircle,
  RefreshCw,
  Building2,
  CreditCard,
} from 'lucide-react';

interface BankConfig {
  bankName?: string;
  bankAccount?: string;
  accountHolder?: string;
}

interface OrderPaymentSectionProps {
  orderId: string;
  orderNumber: string;
  total: number;
  initialPaymentStatus: string;
  paymentMethod: string;
  bankConfig?: BankConfig;
}

export function OrderPaymentSection({
  orderId,
  orderNumber,
  total,
  initialPaymentStatus,
  paymentMethod,
  bankConfig = {},
}: OrderPaymentSectionProps) {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
  const [checking, setChecking] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Bank transfer configuration passed from Server Component / environment
  const bankName = bankConfig.bankName || 'MBBank';
  const bankAccount = bankConfig.bankAccount || '';
  const accountHolder = bankConfig.accountHolder || '';

  // SePay dynamic QR URL
  const qrUrl = bankAccount
    ? `https://qr.sepay.vn/img?acc=${bankAccount}&bank=${bankName}&amount=${Math.round(
        total
      )}&des=${encodeURIComponent(orderNumber)}`
    : '';
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`Đã sao chép ${field}!`);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const checkPaymentStatus = useCallback(async (manual = false) => {
    if (paymentStatus === 'paid') return;
    if (manual) setChecking(true);

    try {
      const res = await fetch(`/api/orders/${orderId}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.paymentStatus === 'paid') {
          setPaymentStatus('paid');
          toast.success('Thanh toán thành công! Hệ thống đã xác nhận đơn hàng.');
          router.refresh();
        } else if (manual) {
          toast.info('Hệ thống chưa ghi nhận giao dịch. Vui lòng thử lại sau vài giây.');
        }
      }
    } catch (err) {
      console.error('Lỗi kiểm tra thanh toán:', err);
    } finally {
      if (manual) setChecking(false);
    }
  }, [orderId, paymentStatus, router]);

  // Polling every 2.5s when order is unpaid and method is bank_transfer
  useEffect(() => {
    if (paymentStatus === 'paid' || paymentMethod !== 'bank_transfer') return;

    const interval = setInterval(() => {
      checkPaymentStatus(false);
    }, 2500);

    return () => clearInterval(interval);
  }, [paymentStatus, paymentMethod, checkPaymentStatus]);

  // Case 1: Order has been successfully paid
  if (paymentStatus === 'paid') {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-900">
              Đã thanh toán thành công qua SePay!
            </h3>
            <p className="text-xs text-emerald-700">
              Giao dịch đã được hệ thống tự động xác thực và cập nhật. Đơn hàng của bạn đang được tiến hành xử lý.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Payment method is not bank transfer (e.g. COD or Credit Card)
  if (paymentMethod !== 'bank_transfer') {
    return null;
  }

  // Case 3: Awaiting SePay VietQR payment
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-indigo-200 text-left space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600 text-white">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Thanh toán Chuyển khoản Tự động (SePay VietQR)
            </h3>
            <p className="text-xs text-slate-500">
              Quét mã QR bằng ứng dụng ngân hàng bất kỳ để hoàn tất thanh toán tức thì
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold self-start sm:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Đang chờ thanh toán...
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic QR Code */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-inner">
          <div className="relative group">
            {qrUrl ? (
              <img
                src={qrUrl}
                alt={`Mã QR thanh toán cho đơn hàng ${orderNumber}`}
                className="w-56 h-56 object-contain rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 gap-2">
                <QrCode className="w-10 h-10" />
                <p className="text-xs text-center px-4">Chưa cấu hình tài khoản ngân hàng</p>
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Mở App ngân hàng &gt; Chọn <b>Quét QR</b> để tự động điền đúng số tiền và nội dung
          </p>
        </div>

        {/* Right: Bank Account Details */}
        <div className="md:col-span-7 space-y-3.5 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-500" /> Ngân hàng thụ hưởng
            </span>
            <p className="font-bold text-slate-900 text-sm">{bankName}</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-slate-500" /> Số tài khoản
              </span>
              <p className="font-mono font-bold text-slate-900 text-sm tracking-wider">{bankAccount}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(bankAccount, 'Số tài khoản')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              {copiedField === 'Số tài khoản' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chép
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Sao chép
                </>
              )}
            </button>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-400 font-medium">Chủ tài khoản</span>
            <p className="font-bold text-slate-900 uppercase text-xs mt-0.5">{accountHolder}</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">Số tiền chuyển khoản</span>
              <p className="font-mono font-extrabold text-emerald-600 text-base">
                {formatCurrency(total)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(Math.round(total).toString(), 'Số tiền')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              {copiedField === 'Số tiền' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chép
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Sao chép
                </>
              )}
            </button>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border-2 border-dashed border-amber-300 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                Nội dung chuyển khoản (bắt buộc)
              </span>
              <p className="font-mono font-extrabold text-indigo-700 text-base">{orderNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(orderNumber, 'Nội dung CK')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              {copiedField === 'Nội dung CK' ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Đã chép
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Sao chép mã
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <p className="font-semibold">Lưu ý quan trọng khi chuyển khoản:</p>
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Vui lòng giữ nguyên mã <b className="font-mono">{orderNumber}</b> trong nội dung chuyển tiền.
            Sau khi nhận được tiền, hệ thống SePay sẽ tự động kích hoạt đơn hàng trong vòng 10-30 giây mà không cần bấm xác nhận.
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          <span>Đang tự động đồng bộ trạng thái giao dịch...</span>
        </div>

        <button
          type="button"
          onClick={() => checkPaymentStatus(true)}
          disabled={checking}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 transition-colors shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
          {checking ? 'Đang kiểm tra...' : 'Tôi đã chuyển khoản'}
        </button>
      </div>
    </div>
  );
}

