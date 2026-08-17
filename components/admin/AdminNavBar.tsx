'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingBag, Users, ShieldCheck, ArrowLeft, Plus } from 'lucide-react';

export function AdminNavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin/products',
      label: 'Sản phẩm',
      icon: Package,
      active: pathname.startsWith('/admin/products'),
    },
    {
      href: '/admin/orders',
      label: 'Đơn hàng',
      icon: ShoppingBag,
      active: pathname.startsWith('/admin/orders'),
    },
    {
      href: '/admin/customers',
      label: 'Khách hàng',
      icon: Users,
      active: pathname.startsWith('/admin/customers'),
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            Hệ thống Quản trị Admin
          </h1>
          <p className="text-xs text-slate-500">
            Quản lý toàn diện Sản phẩm, Đơn hàng và Khách hàng
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Navigation tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  item.active
                    ? 'bg-white text-purple-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-purple-600 font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Profile</span>
        </Link>
      </div>
    </div>
  );
}
