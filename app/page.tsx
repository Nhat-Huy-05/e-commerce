import { HeroAuthSection } from '@/components/common/HeroAuthSection';
import { HeroBannerActions } from '@/components/common/HeroBannerActions';
import { ProductGrid } from '@/components/products/ProductGrid';
import { db } from '@/lib/db';
import { ArrowRight, CreditCard, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import Link from 'next/link';

// SSG + ISR: revalidate every 60s
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
      {/* Full-Width Background Banner with High-Contrast Text Overlay */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md min-h-[400px] sm:min-h-[440px] flex items-center">
        {/* Full-width Background Image */}
        <img
          src="/hero-banner.jpg"
          alt="Hero Banner Promo"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Smooth Gradient Mask for Left Text Area to guarantee 100% legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-2/3 lg:w-1/2 pointer-events-none" />

        {/* High Contrast Banner Content */}
        <div className="relative z-10 max-w-xl p-8 sm:p-12 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-black shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> BỘ SƯU TẬP MỚI 2026
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Nâng Tầm Trải Nghiệm{' '}
            <span className="text-indigo-600">
              Công Nghệ & Lifestyle
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
            Khám phá các sản phẩm công nghệ cao cấp nhất với ưu đãi lên tới 30%. Miễn phí giao hàng toàn quốc và bảo hành chính hãng 12 tháng.
          </p>

          <HeroBannerActions />

          <HeroAuthSection />
        </div>
      </section>

      {/* 3 E-Commerce Store Perks & Utilities */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-200 shrink-0 shadow-xs">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Giao Hàng Hỏa Tốc</h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
              Miễn phí vận chuyển cho tất cả đơn hàng từ $500 trên toàn quốc.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-200 shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Bảo Hành Chính Hãng</h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
              Cam kết 100% sản phẩm chính hãng, bảo hành 12 tháng và đổi trả 30 ngày.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200 shrink-0 shadow-xs">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Thanh Toán An Toàn</h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
              Hỗ trợ thanh toán linh hoạt qua thẻ tín dụng, chuyển khoản & COD.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Sản phẩm Nổi bật</h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Bộ sưu tập những sản phẩm hàng đầu được yêu thích nhất
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Danh mục Sản phẩm</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-center space-y-2"
            >
              <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-slate-100 relative border border-slate-200">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-1">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-500 font-mono font-semibold">
                {cat._count.products} món
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
