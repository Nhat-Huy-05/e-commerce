import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { RenderingBadge } from '@/components/common/RenderingBadge';
import { HeroAuthSection } from '@/components/common/HeroAuthSection';
import { ArrowRight, Sparkles, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

// SSG + ISR rendering strategy - Revalidate static cache every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const featuredProducts = await db.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    take: 8,
  });

  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div className="space-y-10">
      {/* Rendering Strategy Banner */}
      <RenderingBadge
        strategy="SSG"
        revalidateSeconds={60}
        routeName="app/page.tsx (Homepage)"
        reason="Trang chủ có thông tin banner cố định và sản phẩm nổi bật ít thay đổi liên tục. Sử dụng Static Site Generation (SSG) kết hợp Incremental Static Regeneration (ISR - 60 giây) giúp tải trang gần như tức thì (HTML tĩnh pre-render tại build time) mà vẫn đảm bảo cập nhật sản phẩm mới tự động."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Demo Niên Luận Next.js 15 App Router
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Trải nghiệm E-Commerce Tốc độ cao với{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hybrid Rendering
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Hệ thống website demo khả năng kết hợp các chiến lược rendering tiên tiến (SSG, ISR, SSR, CSR) trên Next.js App Router, TypeScript và Prisma ORM.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Khám phá Sản phẩm <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Admin Dashboard (CRUD)
            </Link>
          </div>
          <HeroAuthSection />
        </div>
      </section>

      {/* Render Benefits Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">SSG + ISR (Trang chủ & Chi tiết)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pre-render HTML tại build time cho SEO tối ưu và tốc độ phản hồi cực nhanh dưới 50ms.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">SSR (Tìm kiếm & Thanh toán)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Server-Side Rendering dữ liệu thời gian thực cho trang Tìm kiếm, Checkout và Chi tiết đơn hàng.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">CSR (Giỏ hàng Store)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Client-Side Rendering tương tác mượt mà với Zustand store và LocalStorage persistence.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Sản phẩm Nổi bật</h2>
            <p className="text-xs text-slate-400 mt-1">
              Top các sản phẩm hot được pre-render thông qua SSG + ISR
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Danh mục Sản phẩm</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-2"
            >
              <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-slate-800 relative">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 line-clamp-1">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">
                {cat._count.products} món
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
