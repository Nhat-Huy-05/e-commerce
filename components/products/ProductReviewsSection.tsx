'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/store';
import { Review } from '@/lib/types';
import { Star, MessageSquareCheck, ThumbsUp } from 'lucide-react';

interface ProductReviewsSectionProps {
  reviews: Review[];
}

export function ProductReviewsSection({ reviews }: ProductReviewsSectionProps) {
  const { language } = useLanguage();

  const totalReviews = reviews?.length || 0;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  return (
    <div
      id="product-reviews"
      className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {language === 'vi' ? 'Đánh giá & Nhận xét từ khách hàng' : 'Customer Reviews & Feedback'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'vi'
              ? 'Tổng hợp trải nghiệm thực tế từ những khách hàng đã mua sản phẩm'
              : 'Real feedback from verified purchasers'}
          </p>
        </div>

        {/* Rating summary pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl w-fit">
          <div className="text-2xl font-black text-slate-900">{avgRating}</div>
          <div>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(Number(avgRating))
                      ? 'fill-current'
                      : 'text-slate-200 fill-slate-100'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {totalReviews} {language === 'vi' ? 'lượt đánh giá' : 'reviews'}
            </span>
          </div>
        </div>
      </div>

      {totalReviews === 0 ? (
        <div className="py-8 text-center space-y-2">
          <MessageSquareCheck className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">
            {language === 'vi' ? 'Chưa có bài đánh giá nào' : 'No reviews yet'}
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'vi'
              ? 'Hãy sở hữu sản phẩm để trở thành người đầu tiên chia sẻ cảm nhận hữu ích cho cộng đồng!'
              : 'Be the first to purchase and share your experience with the community!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    {rev.title.slice(0, 1).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{rev.title}</h4>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <ThumbsUp className="w-2.5 h-2.5" />
                      {language === 'vi' ? 'Đã mua hàng chính hãng' : 'Verified Purchase'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-amber-500 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating ? 'fill-current' : 'text-slate-200 fill-slate-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{rev.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
