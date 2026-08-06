'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-store';
import { ShieldAlert, LogIn, ArrowRight } from 'lucide-react';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Đang kiểm tra quyền truy cập Admin...
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-mono font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            403 - Access Denied (Từ chối truy cập)
          </span>
          <h2 className="text-2xl font-extrabold text-white">Yêu cầu Quyền Admin</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Bạn đang đăng nhập với tài khoản Khách hàng hoặc chưa đăng nhập. Trang Quản trị này chỉ dành riêng cho tài khoản có vai trò <strong className="text-purple-400">Admin</strong>.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-lg"
          >
            <LogIn className="w-4 h-4" /> Đăng nhập bằng tài khoản Admin
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Quay lại Trang chủ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
