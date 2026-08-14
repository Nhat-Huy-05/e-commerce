'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store';
import { useAuth } from '@/lib/auth-store';
import {
  ShoppingBag,
  Search,
  ShieldCheck,
  Store,
  Home,
  Package,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';

import { HeaderSearch } from './HeaderSearch';

export function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cartItems = useCart((state) => state.items);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const currentUser = mounted ? user : null;

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-slate-900">
            NextCommerce
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
            Thesis
          </span>
        </Link>

        {/* Search Bar with Live Suggestions */}
        <HeaderSearch />

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span className="hidden md:inline">Products</span>
          </Link>

          {/* Admin Panel Button if Admin */}
          {currentUser?.role === 'admin' && (
            <Link
              href="/admin/products"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden md:inline">Admin Panel</span>
            </Link>
          )}

          {/* User Auth Info / Links */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <Link
                href="/profile"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold ${
                    currentUser.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {currentUser.role}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 transition-colors ml-1"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
