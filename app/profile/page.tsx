'use client';

import { useAuth } from '@/lib/auth-store';
import { useLanguage } from '@/lib/i18n/store';
import { OrderWithItems } from '@/lib/types';
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  CalendarDays,
  Clock,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Users,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/* ─────────────────────────────────── types ─── */
interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  revenueToday: number;
  revenueMonth: number;
  lowStockProducts: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
    shippingName: string;
    shippingEmail: string | null;
    shippingPhone: string | null;
    shippingAddress: string;
    shippingCity: string;
    shippingCountry: string;
    paymentMethod: string;
    user: { name: string; email: string; id: string } | null;
    items: {
      id: string;
      quantity: number;
      price: number;
      product: { id: string; name: string; images: string[]; price: number; discountPrice: number | null };
    }[];
  }[];
}

/* ─────────────────────────────── status badge ─── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200',
    shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span
      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${map[status] ?? 'bg-slate-50 text-slate-600 border-slate-200'
        }`}
    >
      {status}
    </span>
  );
}

/* ─────────────────────────── admin stats section ─── */
function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
        Đang tải dữ liệu thống kê...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-12 text-center text-xs text-red-400">
        Không thể tải dữ liệu. Vui lòng thử lại.
      </div>
    );
  }

  const kpis = [
    {
      label: 'Doanh thu hôm nay',
      value: `$${stats.revenueToday.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      label: 'Doanh thu tháng này',
      value: `$${stats.revenueMonth.toFixed(2)}`,
      icon: BarChart2,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
    },
    {
      label: 'Tổng đơn hàng',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Tổng khách hàng',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
    },
    {
      label: 'Tổng sản phẩm',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
    },
    {
      label: 'Tồn kho thấp (≤5)',
      value: stats.lowStockProducts.toLocaleString(),
      icon: AlertTriangle,
      color: stats.lowStockProducts > 0 ? 'text-red-600' : 'text-slate-400',
      bg: stats.lowStockProducts > 0 ? 'bg-red-50' : 'bg-slate-50',
      border: stats.lowStockProducts > 0 ? 'border-red-100' : 'border-slate-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-600" />
          Tổng quan hệ thống
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className={`flex flex-col gap-2 p-4 rounded-2xl border ${kpi.bg} ${kpi.border}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-white/70`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{kpi.label}</p>
                <p className={`text-xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick action shortcuts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {[
            { href: '/admin/products', label: 'Quản lý SP', icon: Package },
            { href: '/admin/orders', label: 'Quản lý Đơn hàng', icon: ShoppingCart },
            { href: '/admin/customers', label: 'Quản lý Khách hàng', icon: Users },
            { href: '/admin/products/new', label: '+ Thêm SP mới', icon: Plus },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-slate-700 hover:text-purple-700 text-xs font-semibold transition-all"
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent 5 orders */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-purple-600" />
            5 Đơn hàng gần nhất
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
          >
            Xem tất cả <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400">Chưa có đơn hàng nào.</p>
        ) : (
          <div className="space-y-2">
            {stats.recentOrders.map((ord) => {
              const isOpen = expandedId === ord.id;
              return (
                <div
                  key={ord.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-purple-300 bg-purple-50/30'
                      : 'border-slate-100 bg-slate-50 hover:border-purple-200 hover:bg-purple-50/20'
                  }`}
                >
                  {/* Row header – click to toggle */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : ord.id)}
                    className="w-full flex items-center justify-between p-3.5 cursor-pointer text-left"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-mono font-bold text-indigo-600 text-xs">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate">
                        {ord.user?.name ?? 'Khách vãng lai'} · {ord.user?.email ?? ''}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
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
                    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-3">
                      <span className="font-mono text-emerald-600 font-extrabold text-sm">
                        ${ord.total.toFixed(2)}
                      </span>
                      <StatusBadge status={ord.status} />
                      <span className="text-[10px] text-purple-500 font-semibold">
                        {isOpen ? '▲ Thu gọn' : '▼ Chi tiết'}
                      </span>
                    </div>
                  </button>

                  {/* Expandable detail */}
                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3 border-t border-purple-100">
                      {/* Customer info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-slate-600">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800">Thông tin khách hàng</p>
                          <p><span className="text-slate-400">Tên:</span> <strong>{ord.shippingName}</strong></p>
                          <p><span className="text-slate-400">Email:</span> {ord.shippingEmail ?? ord.user?.email ?? '—'}</p>
                          <p><span className="text-slate-400">SĐT:</span> {ord.shippingPhone ?? '—'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800">Địa chỉ giao hàng</p>
                          <p>{ord.shippingAddress}</p>
                          <p>{ord.shippingCity}, {ord.shippingCountry}</p>
                          <p><span className="text-slate-400">Thanh toán:</span> <span className="uppercase font-semibold">{ord.paymentMethod}</span></p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="space-y-2">
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
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-100"
                            >
                              {img ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={img}
                                  alt={item.product.name}
                                  className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0 flex items-center justify-center">
                                  <Package className="w-4 h-4 text-slate-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-900 truncate">{item.product.name}</p>
                                <p className="text-[11px] text-slate-500">
                                  SL: {item.quantity} · Đơn giá: ${item.price.toFixed(2)}
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
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── customer order history ─── */
function CustomerOrders({ userId }: { userId: string }) {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => (r.ok ? r.json() : []))
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
      <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
        <Package className="w-5 h-5 text-indigo-600" />
        {language === 'vi' ? 'Lịch sử Đơn hàng đã mua' : 'Order History'}
      </h2>

      {loading ? (
        <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
          {language === 'vi' ? 'Đang tải danh sách đơn hàng...' : 'Loading order history...'}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 space-y-2">
          <p>{language === 'vi' ? 'Bạn chưa có đơn hàng nào.' : 'You have no orders yet.'}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
          >
            {language === 'vi' ? 'Khám phá sản phẩm để mua sắm ngay' : 'Explore products to start shopping'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-600">{ord.orderNumber}</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(ord.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                  </span>
                </div>
                <span className="font-mono text-emerald-600 font-extrabold">
                  ${ord.total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  {language === 'vi' ? 'Trạng thái:' : 'Status:'}{' '}
                  <span className="text-slate-900 font-bold uppercase">{ord.status}</span>
                </span>
                <Link
                  href={`/orders/${ord.id}`}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                >
                  {language === 'vi' ? 'Xem chi tiết' : 'View Details'} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────── main page ─── */
export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  // Wait for zustand to rehydrate from localStorage before deciding to redirect
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) router.push('/login');
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <div className="py-20 text-center text-slate-500">
        {language === 'vi' ? 'Đang xác thực thông tin tài khoản...' : 'Authenticating account...'}
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  const isAdmin = user.role === 'admin';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Header Card ── */}
      <div
        className={`p-6 rounded-3xl bg-white border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${isAdmin ? 'border-purple-200 ring-1 ring-purple-100' : 'border-slate-200'
          }`}
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          {/* Avatar */}
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-md shrink-0 ${isAdmin
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600'
                : 'bg-gradient-to-br from-indigo-500 to-blue-500'
              }`}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
              <span
                className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${isAdmin
                    ? 'bg-purple-100 text-purple-700 border-purple-300'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            {isAdmin && (
              <p className="text-[11px] text-purple-500 font-medium mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {language === 'vi' ? 'Quản trị viên hệ thống – Toàn quyền quản lý' : 'System Administrator – Full Access'}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-colors"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> {t('common.logout')}
          </button>
        </div>
      </div>

      {/* ── Content: role-based ── */}
      {isAdmin ? <AdminPanel /> : <CustomerOrders userId={user.id} />}
    </div>
  );
}
