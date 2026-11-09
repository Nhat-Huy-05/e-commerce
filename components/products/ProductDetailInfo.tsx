'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/lib/store';
import { useAuth } from '@/lib/auth-store';
import { useLanguage } from '@/lib/i18n/store';
import { ProductWithDetails } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  Check,
  CheckCircle2,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Zap,
} from 'lucide-react';

interface ProductDetailInfoProps {
  product: ProductWithDetails;
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const addItem = useCart((state) => state.addItem);
  const { language, t } = useLanguage();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formattedPrice = formatCurrency(product.price);
  const formattedDiscount = product.discountPrice
    ? formatCurrency(product.discountPrice)
    : null;

  const discountPercent =
    product.discountPrice && product.price > product.discountPrice
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  const isOutOfStock = product.stock <= 0;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    setIsBuyingNow(true);

    // If user is not logged in, redirect to login with checkout redirect target
    if (!user) {
      const checkoutUrl = `/checkout?items=${product.id}`;
      router.push(`/login?redirect=${encodeURIComponent(checkoutUrl)}`);
      return;
    }

    // Add selected quantity and proceed straight to checkout
    addItem(product.id, quantity);
    router.push(`/checkout?items=${product.id}`);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleScrollToReviews = () => {
    const section = document.getElementById('product-reviews');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Category Pill, SKU & Action Icons */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/products?category=${product.category.slug}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 transition-colors"
          >
            {product.category.name}
          </Link>
          <span className="text-xs text-slate-400 font-mono">
            {t('products.sku', 'Mã SP')}: SP-{product.id.slice(-6).toUpperCase()}
          </span>
        </div>

        {/* Quick action buttons (Wishlist & Share) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Chia sẻ sản phẩm"
            className="relative p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title={language === 'vi' ? 'Sao chép liên kết' : 'Copy link'}
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 text-[10px] whitespace-nowrap bg-slate-900 text-white px-2 py-0.5 rounded shadow-md">
                {language === 'vi' ? 'Đã sao chép!' : 'Copied!'}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Yêu thích"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isWishlisted
                ? 'text-rose-500 bg-rose-50'
                : 'text-slate-500 hover:text-rose-500 hover:bg-slate-100'
            }`}
            title={language === 'vi' ? 'Yêu thích' : 'Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {product.name}
        </h1>

        {/* Rating, Social Proof & Stock badge */}
        <div className="flex items-center flex-wrap gap-y-2 gap-x-4 mt-3 pt-1 text-xs">
          {/* Star rating button */}
          <button
            type="button"
            onClick={handleScrollToReviews}
            className="flex items-center gap-1.5 group cursor-pointer"
          >
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'text-slate-200 fill-slate-100'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 group-hover:text-indigo-600 transition-colors underline decoration-slate-300">
              ({product.reviewCount} {t('products.reviews', 'đánh giá')})
            </span>
          </button>

          <span className="text-slate-300 hidden sm:inline">•</span>

          {/* Authentic verification */}
          <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            {language === 'vi' ? 'Chính hãng 100%' : '100% Authentic'}
          </span>

          <span className="text-slate-300 hidden sm:inline">•</span>

          {/* Stock status indicator */}
          <div className="flex items-center gap-1.5">
            {!isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'vi'
                  ? `Còn ${product.stock} sản phẩm`
                  : `${product.stock} in stock`}
              </span>
            ) : (
              <span className="inline-flex items-center text-rose-700 font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {t('common.outOfStock', 'Hết hàng')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/20 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
          {formattedDiscount ? (
            <>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formattedDiscount}
              </span>
              <span className="text-sm sm:text-base text-slate-400 font-medium line-through">
                {formattedPrice}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/90 px-2.5 py-1 rounded-full border border-rose-200">
                <Sparkles className="w-3 h-3 text-rose-600" />
                {language === 'vi' ? 'Tiết kiệm' : 'Save'} {discountPercent}%
              </span>
            </>
          ) : (
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Price reassurance note */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 pt-1 border-t border-slate-200/60 text-[11px] text-slate-600">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-600" />
            {language === 'vi' ? 'Giá đã bao gồm VAT' : 'VAT included'}
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-600" />
            {language === 'vi' ? 'Miễn phí giao hàng toàn quốc' : 'Free nationwide shipping'}
          </span>
        </div>
      </div>

      {/* Short Description */}
      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        {product.description}
      </div>

      {/* Quantity & CTA Purchase Section */}
      <div className="space-y-4 pt-2">
        {/* Quantity Stepper */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">
            {t('common.quantity', 'Số lượng')}:
          </span>
          <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1 || isOutOfStock}
              className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-xs font-bold text-slate-900 select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              disabled={quantity >= product.stock || isOutOfStock}
              className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-[11px] text-amber-600 font-medium">
              {language === 'vi'
                ? `Chỉ còn ${product.stock} suất ưu đãi`
                : `Only ${product.stock} items left`}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to cart & Buy now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              addedToCart
                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50/80 active:scale-[0.99]'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {addedToCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{language === 'vi' ? 'Đã thêm vào giỏ!' : 'Added to cart!'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{t('common.addToCart', 'Thêm vào giỏ')}</span>
              </>
            )}
          </button>

          {/* Buy Now button */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isOutOfStock || isBuyingNow}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isBuyingNow ? t('common.loading', 'Đang chuyển...') : t('common.buyNow', 'Mua ngay')}</span>
          </button>
        </div>
      </div>

      {/* Assurance / Core Value Perks */}
      <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-200">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
          <Truck className="w-4 h-4 text-indigo-600 mb-1" />
          <p className="text-[11px] font-bold text-slate-800">
            {language === 'vi' ? 'Freeship toàn quốc' : 'Free Shipping'}
          </p>
          <span className="text-[10px] text-slate-500 mt-0.5">
            {language === 'vi' ? 'Đơn từ 500k' : 'Orders over 500k'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
          <ShieldCheck className="w-4 h-4 text-purple-600 mb-1" />
          <p className="text-[11px] font-bold text-slate-800">
            {language === 'vi' ? 'Bảo hành 12 tháng' : '12-Month Warranty'}
          </p>
          <span className="text-[10px] text-slate-500 mt-0.5">
            {language === 'vi' ? 'Chính hãng 100%' : '100% genuine'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
          <RotateCcw className="w-4 h-4 text-rose-600 mb-1" />
          <p className="text-[11px] font-bold text-slate-800">
            {language === 'vi' ? 'Đổi trả 30 ngày' : '30-Day Return'}
          </p>
          <span className="text-[10px] text-slate-500 mt-0.5">
            {language === 'vi' ? 'Nếu lỗi từ NSX' : 'Free if defective'}
          </span>
        </div>
      </div>
    </div>
  );
}
