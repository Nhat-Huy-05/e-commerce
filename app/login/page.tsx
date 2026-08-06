'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-store';
import { RenderingBadge } from '@/components/common/RenderingBadge';
import { LogIn, ShieldCheck, UserCheck, Key, Mail, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const setUser = useAuth((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      setUser(data.user);

      // Ưu tiên redirect về trang cũ nếu có (vd: trang sản phẩm khi bị chặn add-to-cart)
      if (redirectTo) {
        router.push(redirectTo);
      } else if (data.user.role === 'admin') {
        router.push('/admin/products');
      } else {
        router.push('/profile');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  const fastLogin = async (fastEmail: string, fastPass: string) => {
    setEmail(fastEmail);
    setPassword(fastPass);
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fastEmail, password: fastPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      setUser(data.user);

      if (redirectTo) {
        router.push(redirectTo);
      } else if (data.user.role === 'admin') {
        router.push('/admin/products');
      } else {
        router.push('/profile');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-4">
      <RenderingBadge
        strategy="CSR"
        routeName="app/login/page.tsx"
        reason="Trang Đăng nhập kết hợp Form tương tác CSR. Cho phép phân quyền vai trò giữa Admin (Quản trị viên) và Customer (Khách hàng) với các mức truy cập và quản lý tài nguyên riêng biệt."
      />

      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Đăng nhập Tài khoản</h1>
          {redirectTo ? (
            <p className="text-xs text-amber-400 font-semibold flex items-center justify-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              Đăng nhập để thêm sản phẩm vào giỏ hàng
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Chọn tài khoản để trải nghiệm các phân quyền khác nhau
            </p>
          )}
        </div>

        {/* 1-Click Fast Login Section */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 text-center">
            ⚡ Đăng nhập Nhanh 1-Click (Dành cho Giảng viên / Test)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fastLogin('admin@commerce.com', 'adminpassword123')}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Admin
            </button>
            <button
              type="button"
              onClick={() => fastLogin('customer@example.com', 'customerpassword123')}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" /> Customer
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@commerce.com hoặc customer@example.com"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-slate-400" /> Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-indigo-400 font-semibold hover:underline">
            Đăng ký Khách hàng mới
          </Link>
        </p>
      </div>
    </div>
  );
}
