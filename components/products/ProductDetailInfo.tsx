'use client';

import React from 'react';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { useLanguage } from '@/lib/i18n/store';
import { ProductWithDetails } from '@/lib/types';
import { RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';

interface ProductDetailInfoProps {
  product: ProductWithDetails;
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const { language, t } = useLanguage();

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
            ({product.reviewCount} {t('products.reviews')})
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
              {language === 'vi' ? 'Tiết kiệm' : 'Save'}{' '}
              {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
            </span>
          </>
        ) : (
          <span className="text-3xl font-extrabold text-slate-900">{formattedPrice}</span>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-900">{t('products.productDetails')}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {product.longDescription || product.description}
        </p>
      </div>

      {/* Stock info */}
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className="text-slate-500">
          {language === 'vi' ? 'Tình trạng kho:' : 'Stock status:'}
        </span>
        {product.stock > 0 ? (
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {language === 'vi' ? `Còn ${product.stock} sản phẩm` : `${product.stock} items left in stock`}
          </span>
        ) : (
          <span className="text-red-700 font-bold bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            {t('common.outOfStock')}
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
          <p className="text-[11px] font-semibold text-slate-700">
            {language === 'vi' ? 'Freeship TOÀN QUỐC' : 'Free Shipping Nationwide'}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <ShieldCheck className="w-5 h-5 mx-auto text-purple-600 mb-1" />
          <p className="text-[11px] font-semibold text-slate-700">
            {language === 'vi' ? 'Bảo hành 12 tháng' : '12-Month Warranty'}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <RotateCcw className="w-5 h-5 mx-auto text-pink-600 mb-1" />
          <p className="text-[11px] font-semibold text-slate-700">
            {language === 'vi' ? 'Đổi trả 30 ngày' : '30-Day Returns'}
          </p>
        </div>
      </div>
    </div>
  );
}
