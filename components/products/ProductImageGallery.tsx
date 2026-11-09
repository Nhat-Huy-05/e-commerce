'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  discountPercent?: number | null;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

export function ProductImageGallery({
  images,
  productName,
  discountPercent,
}: ProductImageGalleryProps) {
  const initialImages = images.length > 0 ? images : [FALLBACK_IMAGE];
  const [selectedImg, setSelectedImg] = useState(initialImages[0] || FALLBACK_IMAGE);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (url: string) => {
    setImgErrors((prev) => ({ ...prev, [url]: true }));
    if (selectedImg === url) {
      setSelectedImg(FALLBACK_IMAGE);
    }
  };

  const currentIndex = Math.max(0, initialImages.indexOf(selectedImg));

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="group relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-xs flex items-center justify-center">
        <img
          src={imgErrors[selectedImg] ? FALLBACK_IMAGE : selectedImg}
          alt={productName}
          onError={() => handleImageError(selectedImg)}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-600/30">
            <Sparkles className="w-3 h-3" />
            <span>-{discountPercent}%</span>
          </div>
        )}

        {/* Image Counter */}
        {initialImages.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-slate-900/60 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
            {currentIndex + 1} / {initialImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {initialImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {initialImages.map((img, idx) => {
            const displayUrl = imgErrors[img] ? FALLBACK_IMAGE : img;
            const isSelected = selectedImg === img;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImg(img)}
                aria-label={`Xem ảnh ${idx + 1}`}
                className={`relative aspect-square rounded-xl overflow-hidden bg-slate-100 border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-[1.02] shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={displayUrl}
                  alt=""
                  onError={() => handleImageError(img)}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
