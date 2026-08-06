import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ProductForm } from '@/components/admin/ProductForm';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  const categories = await db.category.findMany({});

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white">
          Chỉnh sửa Sản phẩm: <span className="text-indigo-400">{product.name}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Cập nhật thông tin giá, tồn kho hoặc danh mục của sản phẩm
        </p>
      </div>

      <ProductForm initialData={product} categories={categories} />
    </div>
  );
}
