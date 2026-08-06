'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-store';
import { User, ShieldCheck, LogIn } from 'lucide-react';

export function HeroAuthSection() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-xs text-slate-300">
        <LogIn className="w-3.5 h-3.5 text-indigo-400" />
        <span>Chưa đăng nhập —</span>
        <Link href="/login" className="text-indigo-400 font-semibold hover:underline">
          Đăng nhập ngay
        </Link>
        <span className="text-slate-500">để lưu lịch sử đơn hàng</span>
      </div>
    );
  }

  return (
    <div
      className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold ${
        user.role === 'admin'
          ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
      }`}
    >
      {user.role === 'admin' ? (
        <ShieldCheck className="w-3.5 h-3.5" />
      ) : (
        <User className="w-3.5 h-3.5" />
      )}
      Xin chào, <span className="font-bold">{user.name}</span>!
      <span
        className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-mono ${
          user.role === 'admin'
            ? 'bg-purple-500/20 text-purple-400'
            : 'bg-emerald-500/20 text-emerald-400'
        }`}
      >
        {user.role}
      </span>
      {user.role === 'admin' && (
        <Link href="/admin/products" className="ml-1 underline hover:no-underline">
          → Admin Panel
        </Link>
      )}
    </div>
  );
}
