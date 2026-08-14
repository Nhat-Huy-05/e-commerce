import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

// SSG + ISR: Revalidate static product page every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { slug: true },
  });

  return products.map((p) => ({
    slug: p.slug,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      reviews: true,
    },
  });

  if (!product) {
    notFound();
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images || '[]');
  } catch {
    images = [];
  }
  if (images.length === 0 && product.thumbnail) {
    images.push(product.thumbnail);
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const formattedDiscount = product.discountPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(product.discountPrice)
    : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs">
        {/* Product Images Gallery */}
        <ProductImageGallery images={images} productName={product.name} />

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
              {product.category.name}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500">
                ({product.reviewCount} Đánh giá)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            {formattedDiscount ? (
              <>
                <span className="text-3xl font-extrabold text-emerald-600">
                  {formattedDiscount}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formattedPrice}
                </span>
                <span className="ml-auto text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  Tiết kiệm {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-slate-900">{formattedPrice}</span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Mô tả sản phẩm</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Stock info */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-slate-500">Tình trạng kho:</span>
            {product.stock > 0 ? (
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Còn {product.stock} sản phẩm
              </span>
            ) : (
              <span className="text-red-700 font-bold bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                Hết hàng
              </span>
            )}
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-2">
            <AddToCartButton productId={product.id} variant="full" />
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Truck className="w-5 h-5 mx-auto text-indigo-600 mb-1" />
              <p className="text-[11px] font-semibold text-slate-700">Freeship TOÀN QUỐC</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-5 h-5 mx-auto text-purple-600 mb-1" />
              <p className="text-[11px] font-semibold text-slate-700">Bảo hành 12 tháng</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <RotateCcw className="w-5 h-5 mx-auto text-pink-600 mb-1" />
              <p className="text-[11px] font-semibold text-slate-700">Đổi trả 30 ngày</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
          <h3 className="text-lg font-extrabold text-slate-900">Đánh giá từ khách hàng</h3>
          <div className="space-y-3">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{rev.title}</span>
                  <span className="text-xs font-bold text-amber-500">★ {rev.rating}/5</span>
                </div>
                <p className="text-xs text-slate-600">{rev.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
