import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductDetailInfo } from '@/components/products/ProductDetailInfo';
import { ProductReviewsSection } from '@/components/products/ProductReviewsSection';

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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs">
        {/* Product Images Gallery */}
        <ProductImageGallery images={images} productName={product.name} />

        {/* Product Details & Purchase CTA */}
        <ProductDetailInfo product={product} />
      </div>

      {/* Reviews section */}
      <ProductReviewsSection reviews={product.reviews} />
    </div>
  );
}
