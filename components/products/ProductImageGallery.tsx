'use client';

import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const initialImages = images.length > 0 ? images : [FALLBACK_IMAGE];
  const [selectedImg, setSelectedImg] = useState(initialImages[0] || FALLBACK_IMAGE);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (url: string) => {
    setImgErrors((prev) => ({ ...prev, [url]: true }));
    if (selectedImg === url) {
      setSelectedImg(FALLBACK_IMAGE);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
        <img
          src={imgErrors[selectedImg] ? FALLBACK_IMAGE : selectedImg}
          alt={productName}
          onError={() => handleImageError(selectedImg)}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {initialImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {initialImages.map((img, idx) => {
            const displayUrl = imgErrors[img] ? FALLBACK_IMAGE : img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImg(img)}
                className={`aspect-square rounded-xl overflow-hidden bg-slate-100 border transition-all cursor-pointer ${
                  selectedImg === img
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img
                  src={displayUrl}
                  alt=""
                  onError={() => handleImageError(img)}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
