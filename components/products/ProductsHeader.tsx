'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/store';

interface ProductsHeaderProps {
  count: number;
}

export function ProductsHeader({ count }: ProductsHeaderProps) {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          {t('products.allProducts')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'vi'
            ? `Hiển thị ${count} sản phẩm`
            : `Showing ${count} products`}
        </p>
      </div>
    </div>
  );
}
