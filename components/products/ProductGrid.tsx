import React from 'react';
import { ProductWithCategory } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: ProductWithCategory[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = 'No products found matching your criteria.',
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
        <p className="text-base text-slate-400 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
