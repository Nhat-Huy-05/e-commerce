'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-store';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function HeroBannerActions() {
  const { user } = useAuth();

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-all"
      >
        Khám phá ngay <ArrowRight className="w-4 h-4" />
      </Link>

      {user?.role === 'admin' && (
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-purple-300 shadow-sm transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-purple-600" /> Admin Dashboard
        </Link>
      )}
    </div>
  );
}
