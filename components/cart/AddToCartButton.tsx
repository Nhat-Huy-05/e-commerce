'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/store';
import { useLanguage } from '@/lib/i18n/store';
import { ShoppingBag, Check } from 'lucide-react';

interface AddToCartButtonProps {
  productId: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'full';
  showLabelOnMobile?: boolean;
}

export function AddToCartButton({
  productId,
  className = '',
  variant = 'primary',
  showLabelOnMobile = false,
}: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const { language, t } = useLanguage();

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Cho phép thêm vào giỏ mà không bắt buộc phải đăng nhập
    addItem(productId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 select-none';

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm hover:shadow',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs border border-slate-700',
    full: 'w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 text-base shadow-md',
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      title={t('common.addToCart')}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          <span className={variant === 'full' || showLabelOnMobile ? 'ml-2' : 'hidden sm:inline ml-1.5'}>
            {language === 'vi' ? 'Đã thêm!' : 'Added!'}
          </span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className={variant === 'full' || showLabelOnMobile ? 'ml-2' : 'hidden sm:inline ml-1.5'}>
            {t('common.addToCart')}
          </span>
        </>
      )}
    </button>
  );
}
