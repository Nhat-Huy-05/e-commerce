'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-store';
import { OrderWithItems } from '@/lib/types';
import { RenderingBadge } from '@/components/common/RenderingBadge';
import { User, LogOut, Package, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchUserOrders() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, [user, router]);

  if (!user) {
    return (
      <div className="py-20 text-center text-slate-400">
        Đang xác thực thông tin tài khoản...
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <RenderingBadge
        strategy="CSR"
        routeName="app/profile/page.tsx"
        reason="Trang Thông tin cá nhân & Lịch sử đơn hàng là trang được bảo vệ (Protected CSR Route). Yêu cầu người dùng phải đăng nhập trước khi tải dữ liệu cá nhân."
      />

      {/* User Info Header Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  user.role === 'admin'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user.role === 'admin' && (
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Personal Order History */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-400" /> Lịch sử Đơn hàng đã mua
        </h2>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-500">
            Đang tải danh sách đơn hàng...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 space-y-2">
            <p>Bạn chưa có đơn hàng nào.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-indigo-400 hover:underline font-semibold"
            >
              Khám phá sản phẩm để mua sắm ngay <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-400">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(ord.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <span className="font-mono text-emerald-400 font-bold">
                    ${ord.total.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Trạng thái: <span className="text-slate-200 font-semibold uppercase">{ord.status}</span>
                  </span>
                  <Link
                    href={`/orders/${ord.id}`}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    Xem chi tiết <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
