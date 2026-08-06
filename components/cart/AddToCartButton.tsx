'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/lib/store';
import { useAuth } from '@/lib/auth-store';
import { ShoppingBag, Check, LogIn } from 'lucide-react';

interface AddToCartButtonProps {
  productId: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'full';
}

export function AddToCartButton({
  productId,
  className = '',
  variant = 'primary',
}: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [added, setAdded] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 🔐 Chưa đăng nhập → redirect sang /login
    if (!user) {
      setNeedsLogin(true);
      setTimeout(() => {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      }, 800); // ngắn xíu để user thấy feedback trước khi chuyển trang
      return;
    }

    // ✅ Đã đăng nhập → add to cart bình thường
    addItem(productId, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50';

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm shadow-sm hover:shadow',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 text-xs border border-slate-700',
    full: 'w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 text-base shadow-md',
  };

  // Trạng thái "cần đăng nhập" — override màu sang vàng cam
  const needsLoginStyles =
    variant === 'full'
      ? 'w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 text-base shadow-md'
      : 'bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-sm shadow-sm';

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`${baseStyles} ${needsLogin ? needsLoginStyles : variantStyles[variant]} ${className}`}
    >
      {needsLogin ? (
        <>
          <LogIn className="w-4 h-4 mr-2 animate-bounce" />
          Vui lòng đăng nhập...
        </>
      ) : added ? (
        <>
          <Check className="w-4 h-4 mr-2 text-emerald-400" />
          Đã thêm vào giỏ!
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </>
      )}
    </button>
  );
}
