'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-store';
import { ShieldCheck } from 'lucide-react';

export function AdminPageHeader({ totalProducts }: { totalProducts: number }) {
  const { user } = useAuth();

  return (
    <div className="pb-4 border-b border-slate-800">
      <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
        <ShieldCheck className="w-8 h-8 text-purple-400" /> Admin Product Management
      </h1>
      <p className="text-xs text-slate-400 mt-1">
        Xin chào, <span className="text-purple-300 font-semibold">{user?.name ?? 'Admin'}</span>! Quản lý toàn bộ{' '}
        <strong className="text-white">{totalProducts}</strong> sản phẩm trong hệ thống (SSR Dashboard).
      </p>
    </div>
  );
}
