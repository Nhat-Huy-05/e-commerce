'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/store';
import { Review } from '@/lib/types';

interface ProductReviewsSectionProps {
  reviews: Review[];
}

export function ProductReviewsSection({ reviews }: ProductReviewsSectionProps) {
  const { language } = useLanguage();

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
      <h3 className="text-lg font-extrabold text-slate-900">
        {language === 'vi' ? 'Đánh giá từ khách hàng' : 'Customer Reviews'}
      </h3>
      <div className="space-y-3">
        {reviews.map((rev) => (
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
  );
}
