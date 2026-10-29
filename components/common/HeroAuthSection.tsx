'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-store';
import { useLanguage } from '@/lib/i18n/store';
import { User, ShieldCheck, LogIn } from 'lucide-react';

export function HeroAuthSection() {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  if (!user) {
    return (
      <div className="mt-4 inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-xs font-semibold text-slate-800 shadow-xs">
        <LogIn className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>{language === 'vi' ? 'Chưa đăng nhập —' : 'Not signed in —'}</span>
        <Link href="/login" className="text-indigo-700 font-extrabold hover:underline">
          {language === 'vi' ? 'Đăng nhập ngay' : 'Sign in now'}
        </Link>
        <span className="text-slate-600 font-medium">
          {language === 'vi' ? 'để lưu lịch sử đơn hàng' : 'to save order history'}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`mt-4 inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold shadow-xs ${
        user.role === 'admin'
          ? 'bg-purple-50 text-purple-900 border-purple-200'
          : 'bg-emerald-50 text-emerald-900 border-emerald-200'
      }`}
    >
      {user.role === 'admin' ? (
        <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
      ) : (
        <User className="w-4 h-4 text-emerald-600 shrink-0" />
      )}
      <span>
        {language === 'vi' ? 'Xin chào, ' : 'Hello, '}
        <strong className="font-extrabold text-slate-900">{user.name}</strong>!
      </span>
      <span
        className={`text-[10px] uppercase px-2 py-0.5 rounded-md font-mono font-extrabold ${
          user.role === 'admin'
            ? 'bg-purple-200 text-purple-900'
            : 'bg-emerald-200 text-emerald-900'
        }`}
      >
        {user.role}
      </span>
      {user.role === 'admin' && (
        <Link href="/admin/products" className="ml-1 text-purple-700 underline font-bold hover:no-underline">
          → {t('header.admin')}
        </Link>
      )}
    </div>
  );
}
