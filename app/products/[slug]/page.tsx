import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductDetailInfo } from '@/components/products/ProductDetailInfo';
import { ProductTabs } from '@/components/products/ProductTabs';
import { ProductReviewsSection } from '@/components/products/ProductReviewsSection';
import { ProductCard } from '@/components/products/ProductCard';

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

  // Fetch up to 4 related products in the same category
  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: {
      category: true,
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  let images: string[] = [];
  try {
    const parsed = JSON.parse(product.images || '[]');
    if (Array.isArray(parsed)) {
      images = parsed.filter(Boolean);
    }
  } catch {
    images = [];
  }
  if (product.thumbnail && !images.includes(product.thumbnail)) {
    images.unshift(product.thumbnail);
  }

  const discountPercent =
    product.discountPrice && product.price > product.discountPrice
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : null;

  const breadcrumbs = [
    { label: 'Sản phẩm', href: '/products' },
    { label: product.category.name, href: `/products?category=${product.category.slug}` },
    { label: product.name },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbs} className="px-1" />

      {/* Main Product Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white border border-slate-200/90 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xs">
        {/* Product Images Gallery */}
        <ProductImageGallery
          images={images}
          productName={product.name}
          discountPercent={discountPercent}
        />

        {/* Product Details & Purchase Actions */}
        <ProductDetailInfo product={product} />
      </div>

      {/* Product Details, Specs and Policies Tabs */}
      <ProductTabs product={product} />

      {/* Customer Reviews section */}
      <ProductReviewsSection reviews={product.reviews} />

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="space-y-5 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Sản phẩm tương tự</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các sản phẩm cùng danh mục {product.category.name} được quan tâm nhiều nhất
              </p>
            </div>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors hidden sm:inline-block"
            >
              Xem tất cả &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
