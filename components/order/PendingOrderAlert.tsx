'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, QrCode, X } from 'lucide-react';

interface PendingOrderInfo {
  id: string;
  orderNumber: string;
  total: number;
  createdAt: string;
}

export function PendingOrderAlert() {
  const pathname = usePathname();
  const [pendingOrder, setPendingOrder] = useState<PendingOrderInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pending_order_recovery');
      if (!raw) {
        setPendingOrder(null);
        return;
      }
      const parsed: PendingOrderInfo = JSON.parse(raw);
      if (!parsed?.id) return;

      // Check if user dismissed notification for this order in the current session
      const isDismissed = sessionStorage.getItem(`dismiss_pending_${parsed.id}`);
      if (isDismissed) {
        setDismissed(true);
        return;
      }

      // Verify real-time order status with the backend API
      fetch(`/api/orders/${parsed.id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Order not found');
          return res.json();
        })
        .then((data) => {
          if (data && data.paymentStatus === 'pending' && data.paymentMethod === 'bank_transfer') {
            setPendingOrder({
              id: data.id,
              orderNumber: data.orderNumber,
              total: data.total,
              createdAt: parsed.createdAt,
            });
          } else {
            // Order has been paid or cancelled -> clean up storage
            localStorage.removeItem('pending_order_recovery');
            setPendingOrder(null);
          }
        })
        .catch(() => {
          localStorage.removeItem('pending_order_recovery');
          setPendingOrder(null);
        });
    } catch (_) {}
  }, [pathname]);

  // Hide alert if dismissed, no pending order, or currently viewing the order details page
  if (!pendingOrder || dismissed || pathname === `/orders/${pendingOrder.id}`) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(`dismiss_pending_${pendingOrder.id}`, 'true');
    } catch (_) {}
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white shadow-sm border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="font-semibold truncate">
            Bạn có đơn hàng <span className="font-mono font-bold underline">#{pendingOrder.orderNumber}</span> ({formatCurrency(pendingOrder.total)}) đang chờ quét mã VietQR SePay!
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/orders/${pendingOrder.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-amber-900 font-bold text-xs shadow-xs hover:bg-amber-50 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-700" />
            <span>Quét mã thanh toán ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-black/10 transition-colors cursor-pointer"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
