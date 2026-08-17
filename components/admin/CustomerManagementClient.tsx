'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  Search,
  Crown,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ArrowUpDown,
  ExternalLink,
  X,
  Clock,
  Package,
  CheckCircle2,
  Copy,
  ChevronRight,
  Filter,
  Ban,
  ShieldCheck,
  Lock,
  Unlock,
  Loader2,
} from 'lucide-react';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  paymentMethod: string | null;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      thumbnail: string;
      images: string;
    };
  }[];
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string; // 'active' | 'banned'
  createdAt: string;
  orders: CustomerOrder[];
}

export type CustomerSegment = 'vip' | 'regular' | 'new' | 'at_risk' | 'inactive';

interface EnrichedCustomer extends CustomerData {
  totalSpent: number;
  orderCount: number;
  latestOrderDate: Date | null;
  phone: string | null;
  address: string | null;
  segment: CustomerSegment;
  daysSinceJoined: number;
  daysSinceLastOrder: number | null;
}

export function CustomerManagementClient({ customers }: { customers: CustomerData[] }) {
  const router = useRouter();
  const [customerList, setCustomerList] = useState<CustomerData[]>(customers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'spent_desc' | 'orders_desc' | 'recent_join' | 'recent_order' | 'name_asc'>('spent_desc');
  const [selectedCustomer, setSelectedCustomer] = useState<EnrichedCustomer | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const now = useMemo(() => new Date(), []);

  // Compute enriched customer metrics
  const enrichedCustomers: EnrichedCustomer[] = useMemo(() => {
    return customerList.map((c) => {
      const validOrders = c.orders.filter((o) => o.status !== 'cancelled');
      const totalSpent = validOrders.reduce((sum, o) => sum + o.total, 0);
      const orderCount = c.orders.length;

      const sortedOrders = [...c.orders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const latestOrder = sortedOrders[0] ?? null;
      const latestOrderDate = latestOrder ? new Date(latestOrder.createdAt) : null;

      const phone = latestOrder?.shippingPhone ?? null;
      const address = latestOrder
        ? `${latestOrder.shippingAddress}, ${latestOrder.shippingCity}`
        : null;

      const joinDate = new Date(c.createdAt);
      const daysSinceJoined = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24));
      const daysSinceLastOrder = latestOrderDate
        ? Math.floor((now.getTime() - latestOrderDate.getTime()) / (1000 * 3600 * 24))
        : null;

      let segment: CustomerSegment = 'regular';
      if (totalSpent >= 500 || orderCount >= 3) {
        segment = 'vip';
      } else if (orderCount === 0 && daysSinceJoined <= 30) {
        segment = 'new';
      } else if (orderCount >= 1 && daysSinceLastOrder !== null && daysSinceLastOrder >= 60) {
        segment = 'at_risk';
      } else if (orderCount === 0 && daysSinceJoined > 30) {
        segment = 'inactive';
      }

      return {
        ...c,
        status: c.status || 'active',
        totalSpent,
        orderCount,
        latestOrderDate,
        phone,
        address,
        segment,
        daysSinceJoined,
        daysSinceLastOrder,
      };
    });
  }, [customerList, now]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = enrichedCustomers.length;
    const vipCount = enrichedCustomers.filter((c) => c.segment === 'vip').length;
    const totalRevenue = enrichedCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
    const payingCustomers = enrichedCustomers.filter((c) => c.orderCount > 0).length;
    const avgSpend = payingCustomers > 0 ? totalRevenue / payingCustomers : 0;
    const atRiskCount = enrichedCustomers.filter((c) => c.segment === 'at_risk').length;
    const bannedCount = enrichedCustomers.filter((c) => c.status === 'banned').length;

    return {
      total,
      vipCount,
      totalRevenue,
      avgSpend,
      atRiskCount,
      bannedCount,
      payingCustomers,
    };
  }, [enrichedCustomers]);

  // Handle Ban / Unban User
  const handleToggleStatus = async (customer: EnrichedCustomer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextStatus = customer.status === 'banned' ? 'active' : 'banned';
    const actionText = nextStatus === 'banned' ? 'khóa (Ban)' : 'mở khóa (Unban)';

    if (!confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản của khách hàng "${customer.name}" (${customer.email})?`)) {
      return;
    }

    setActionLoadingId(customer.id);
    setNotificationMsg(null);

    try {
      const res = await fetch(`/api/admin/users/${customer.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Thao tác không thành công');
      }

      // Update state locally
      setCustomerList((prev) =>
        prev.map((item) =>
          item.id === customer.id ? { ...item, status: nextStatus } : item
        )
      );

      if (selectedCustomer && selectedCustomer.id === customer.id) {
        setSelectedCustomer((prev) => (prev ? { ...prev, status: nextStatus } : null));
      }

      setNotificationMsg({
        text: `✅ ${data.message || `Đã ${actionText} tài khoản thành công.`}`,
        type: 'success',
      });
      setTimeout(() => setNotificationMsg(null), 4000);
    } catch (err: any) {
      setNotificationMsg({
        text: `⚠️ Lỗi: ${err.message || 'Không thể cập nhật trạng thái'}`,
        type: 'error',
      });
      setTimeout(() => setNotificationMsg(null), 5000);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter & Search Logic
  const filteredCustomers = useMemo(() => {
    return enrichedCustomers
      .filter((c) => {
        // Search filter
        const matchSearch =
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.phone && c.phone.includes(searchTerm)) ||
          (c.address && c.address.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!matchSearch) return false;

        // Segment filter
        if (selectedSegment === 'all') return true;
        if (selectedSegment === 'vip') return c.segment === 'vip';
        if (selectedSegment === 'regular') return c.segment === 'regular';
        if (selectedSegment === 'new') return c.segment === 'new';
        if (selectedSegment === 'at_risk') return c.segment === 'at_risk';
        if (selectedSegment === 'banned') return c.status === 'banned';
        if (selectedSegment === 'no_orders') return c.orderCount === 0;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'spent_desc') return b.totalSpent - a.totalSpent;
        if (sortBy === 'orders_desc') return b.orderCount - a.orderCount;
        if (sortBy === 'recent_join') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'recent_order') {
          const timeA = a.latestOrderDate ? a.latestOrderDate.getTime() : 0;
          const timeB = b.latestOrderDate ? b.latestOrderDate.getTime() : 0;
          return timeB - timeA;
        }
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [enrichedCustomers, searchTerm, selectedSegment, sortBy]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getAccountStatusBadge = (status: string) => {
    if (status === 'banned') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-200">
          <Ban className="w-3 h-3 text-red-600" /> Bị khóa (Banned)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Hoạt động
      </span>
    );
  };

  const getSegmentBadge = (segment: CustomerSegment) => {
    switch (segment) {
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-700 border border-purple-200">
            <Crown className="w-3 h-3 text-purple-600" /> VIP
          </span>
        );
      case 'regular':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <ShoppingBag className="w-3 h-3 text-emerald-600" /> Thân thiết
          </span>
        );
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600" /> Mới
          </span>
        );
      case 'at_risk':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> Cần chăm sóc
          </span>
        );
      case 'inactive':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Chưa mua
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      processing: 'bg-blue-50 text-blue-700 border-blue-200',
      shipped: 'bg-purple-50 text-purple-700 border-purple-200',
      delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
          statusMap[status] ?? 'bg-slate-50 text-slate-600 border-slate-200'
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Alert */}
      {notificationMsg && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between shadow-md transition-all ${
            notificationMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <span>{notificationMsg.text}</span>
          <button onClick={() => setNotificationMsg(null)} className="text-slate-500 hover:text-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Tổng Khách Hàng</p>
            <p className="text-2xl font-black text-slate-900">{stats.total}</p>
            <p className="text-[11px] text-slate-400">
              {stats.payingCustomers} khách đã từng mua hàng
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Khách Hàng VIP</p>
            <p className="text-2xl font-black text-purple-600">{stats.vipCount}</p>
            <p className="text-[11px] text-purple-500 font-medium">
              Chi tiêu $500+ hoặc ≥3 đơn
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Tổng Chi Tiêu Khách (LTV)</p>
            <p className="text-2xl font-black text-emerald-600">
              ${stats.totalRevenue.toFixed(2)}
            </p>
            <p className="text-[11px] text-slate-400">
              TB: ${stats.avgSpend.toFixed(2)}/khách mua
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
            <Ban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Tài Khoản Bị Khóa</p>
            <p className="text-2xl font-black text-red-600">{stats.bannedCount}</p>
            <p className="text-[11px] text-slate-400">
              {stats.atRiskCount} khách &gt; 60 ngày chưa mua
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên, email, số điện thoại, địa chỉ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="spent_desc">Chi tiêu cao nhất ($$$)</option>
              <option value="orders_desc">Nhiều đơn hàng nhất</option>
              <option value="recent_order">Mới mua hàng gần nhất</option>
              <option value="recent_join">Khách mới đăng ký</option>
              <option value="name_asc">Tên A → Z</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Lọc:
          </span>
          {[
            { id: 'all', label: `Tất cả (${enrichedCustomers.length})` },
            { id: 'vip', label: `👑 VIP (${stats.vipCount})` },
            {
              id: 'regular',
              label: `🛍️ Thân thiết (${
                enrichedCustomers.filter((c) => c.segment === 'regular').length
              })`,
            },
            {
              id: 'new',
              label: `🌱 Mới (${
                enrichedCustomers.filter((c) => c.segment === 'new').length
              })`,
            },
            { id: 'at_risk', label: `⚠️ Cần chăm sóc (${stats.atRiskCount})` },
            {
              id: 'banned',
              label: `🔴 Bị khóa (${stats.bannedCount})`,
            },
            {
              id: 'no_orders',
              label: `Chưa mua (${
                enrichedCustomers.filter((c) => c.orderCount === 0).length
              })`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSegment(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedSegment === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customer List Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            Không tìm thấy khách hàng nào khớp với tiêu chí tìm kiếm.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Trạng thái TK</th>
                  <th className="py-3 px-4">Phân loại</th>
                  <th className="py-3 px-4">Liên hệ & Địa chỉ</th>
                  <th className="py-3 px-4 text-center">Đơn hàng</th>
                  <th className="py-3 px-4 text-right">Tổng chi tiêu</th>
                  <th className="py-3 px-4 text-right">Mua gần nhất</th>
                  <th className="py-3 px-4 text-center">Tác vụ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredCustomers.map((c) => {
                  const initial = c.name.charAt(0).toUpperCase() || 'U';
                  const isBanned = c.status === 'banned';
                  const isLoading = actionLoadingId === c.id;

                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-purple-50/40 transition-colors group cursor-pointer ${
                        isBanned ? 'bg-red-50/20' : ''
                      }`}
                      onClick={() => setSelectedCustomer(c)}
                    >
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ${
                              isBanned
                                ? 'bg-gradient-to-br from-red-500 to-rose-600'
                                : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                            }`}
                          >
                            {initial}
                          </div>
                          <div>
                            <p
                              className={`font-bold transition-colors ${
                                isBanned
                                  ? 'text-red-700 line-through'
                                  : 'text-slate-900 group-hover:text-purple-700'
                              }`}
                            >
                              {c.name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">{c.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Account Status Badge */}
                      <td className="py-3.5 px-4">{getAccountStatusBadge(c.status)}</td>

                      {/* Segment Badge */}
                      <td className="py-3.5 px-4">{getSegmentBadge(c.segment)}</td>

                      {/* Phone & Address */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 text-[11px]">
                          {c.phone ? (
                            <p className="font-medium text-slate-800 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" /> {c.phone}
                            </p>
                          ) : (
                            <span className="text-slate-400 italic">Chưa có SĐT</span>
                          )}
                          {c.address ? (
                            <p className="text-slate-500 max-w-[180px] truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {c.address}
                            </p>
                          ) : (
                            <span className="text-slate-400 italic">Chưa có địa chỉ</span>
                          )}
                        </div>
                      </td>

                      {/* Orders Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 font-bold text-slate-800 text-[11px]">
                          {c.orderCount} đơn
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="py-3.5 px-4 text-right">
                        <p className="font-black text-emerald-600 text-sm font-mono">
                          ${c.totalSpent.toFixed(2)}
                        </p>
                      </td>

                      {/* Latest Order */}
                      <td className="py-3.5 px-4 text-right text-[11px] text-slate-500">
                        {c.latestOrderDate ? (
                          <div>
                            <p className="font-semibold text-slate-700">
                              {c.latestOrderDate.toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {c.daysSinceLastOrder === 0
                                ? 'Hôm nay'
                                : `${c.daysSinceLastOrder} ngày trước`}
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Chưa phát sinh</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          {/* Ban / Unban Button */}
                          <button
                            disabled={isLoading}
                            onClick={(e) => handleToggleStatus(c, e)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isBanned
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={isBanned ? 'Mở khóa tài khoản' : 'Khóa tài khoản (Ban)'}
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                            ) : isBanned ? (
                              <Unlock className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </button>

                          {/* Email */}
                          <a
                            href={`mailto:${c.email}?subject=NextCommerce - Thông tin tài khoản`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Gửi Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>

                          {/* View Detail */}
                          <button
                            onClick={() => setSelectedCustomer(c)}
                            className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors"
                            title="Xem chi tiết"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md rounded-t-3xl">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center font-extrabold text-xl shadow-md ${
                    selectedCustomer.status === 'banned'
                      ? 'bg-gradient-to-br from-red-500 to-rose-600'
                      : 'bg-gradient-to-br from-purple-600 to-indigo-600'
                  }`}
                >
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-lg font-black ${
                        selectedCustomer.status === 'banned'
                          ? 'text-red-700 line-through'
                          : 'text-slate-900'
                      }`}
                    >
                      {selectedCustomer.name}
                    </h3>
                    {getAccountStatusBadge(selectedCustomer.status)}
                    {getSegmentBadge(selectedCustomer.segment)}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedCustomer.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Account Status Alert inside modal */}
              {selectedCustomer.status === 'banned' && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-red-600 shrink-0" />
                    <span>
                      Tài khoản này đang bị <strong>KHÓA (Banned)</strong> và không thể đăng nhập vào website.
                    </span>
                  </div>
                  <button
                    disabled={actionLoadingId === selectedCustomer.id}
                    onClick={() => handleToggleStatus(selectedCustomer)}
                    className="px-3 py-1 bg-white hover:bg-red-100 border border-red-300 rounded-xl font-bold text-red-700 transition-colors shrink-0 cursor-pointer text-xs"
                  >
                    {actionLoadingId === selectedCustomer.id ? 'Đang xử lý...' : 'Mở khóa ngay'}
                  </button>
                </div>
              )}

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-[11px] font-semibold text-emerald-600">Tổng Chi Tiêu</p>
                  <p className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                    ${selectedCustomer.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 text-center">
                  <p className="text-[11px] font-semibold text-purple-600">Tổng Đơn Hàng</p>
                  <p className="text-xl font-black text-purple-700 mt-0.5">
                    {selectedCustomer.orderCount}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                  <p className="text-[11px] font-semibold text-blue-600">Giá Trị TB / Đơn</p>
                  <p className="text-xl font-black text-blue-700 font-mono mt-0.5">
                    $
                    {selectedCustomer.orderCount > 0
                      ? (selectedCustomer.totalSpent / selectedCustomer.orderCount).toFixed(2)
                      : '0.00'}
                  </p>
                </div>
              </div>

              {/* Contact & Profile Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Thông Tin Liên Hệ & Đăng Ký
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email:</span>
                    <strong className="text-slate-900 font-mono">{selectedCustomer.email}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>SĐT:</span>
                    <strong className="text-slate-900 font-mono">
                      {selectedCustomer.phone || 'Chưa cập nhật'}
                    </strong>
                  </p>
                  <p className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Địa chỉ nhận hàng:</span>
                    <strong className="text-slate-900">
                      {selectedCustomer.address || 'Chưa có thông tin địa chỉ'}
                    </strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ngày tham gia:</span>
                    <strong className="text-slate-900">
                      {new Date(selectedCustomer.createdAt).toLocaleDateString('vi-VN')}
                    </strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Thời gian gắn bó:</span>
                    <strong className="text-slate-900">
                      {selectedCustomer.daysSinceJoined} ngày
                    </strong>
                  </p>
                </div>

                {/* Quick Actions Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                  {/* Ban/Unban Action Button */}
                  <button
                    disabled={actionLoadingId === selectedCustomer.id}
                    onClick={() => handleToggleStatus(selectedCustomer)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shadow-xs cursor-pointer ${
                      selectedCustomer.status === 'banned'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {actionLoadingId === selectedCustomer.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang xử lý...
                      </>
                    ) : selectedCustomer.status === 'banned' ? (
                      <>
                        <Unlock className="w-3.5 h-3.5" /> Mở khóa tài khoản
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Khóa tài khoản này
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${selectedCustomer.email}?subject=NextCommerce - Ưu đãi tri ân dành riêng cho bạn`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" /> Gửi Email ưu đãi
                  </a>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        `Tên: ${selectedCustomer.name}\nEmail: ${selectedCustomer.email}\nSĐT: ${selectedCustomer.phone ?? 'N/A'}\nĐịa chỉ: ${selectedCustomer.address ?? 'N/A'}`,
                        selectedCustomer.id
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {copiedId === selectedCustomer.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" /> Sao chép thông tin
                      </>
                    )}
                  </button>

                  <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold text-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Quản lý Đơn hàng
                  </Link>
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Lịch sử Mua hàng ({selectedCustomer.orders.length})</span>
                </h4>

                {selectedCustomer.orders.length === 0 ? (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                    Khách hàng này chưa phát sinh đơn hàng nào.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                    {selectedCustomer.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-indigo-600">
                              {ord.orderNumber}
                            </span>
                            {getStatusBadge(ord.status)}
                          </div>
                          <span className="font-mono font-black text-emerald-600">
                            ${ord.total.toFixed(2)}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {new Date(ord.createdAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className="text-slate-400">
                            {ord.items.length} mặt hàng · {ord.paymentMethod?.toUpperCase() ?? 'COD'}
                          </span>
                        </div>

                        {/* Items preview */}
                        <div className="space-y-1 pt-1 border-t border-slate-100">
                          {ord.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-[11px] text-slate-600"
                            >
                              <span className="truncate max-w-[280px]">• {item.product.name}</span>
                              <span className="font-mono">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end rounded-b-3xl">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
