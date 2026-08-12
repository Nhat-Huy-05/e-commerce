'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2, ArrowRight, Tag } from 'lucide-react';
import { ProductWithCategory } from '@/lib/types';

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

export function HeaderSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced live search fetching
  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data: ProductWithCategory[] = await res.json();
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (
      selectedIndex >= 0 &&
      selectedIndex < suggestions.length &&
      suggestions[selectedIndex]
    ) {
      const selectedProduct = suggestions[selectedIndex];
      handleSelectProduct(selectedProduct.slug);
      return;
    }

    if (searchQuery.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsOpen(false);
    router.push(`/products/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' && searchQuery.trim()) {
        setIsOpen(true);
      }
      return;
    }

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length ? prev + 1 : prev
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    }
    // Escape
    else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 max-w-md hidden sm:block relative z-50"
    >
      <form onSubmit={handleFormSubmit} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm... (ví dụ: phone, audio, chair...)"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (searchQuery.trim()) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-9 pr-9 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />

        {/* Right side loading spinner or clear button */}
        <div className="absolute right-3 flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
          ) : searchQuery ? (
            <button
              type="button"
              onClick={clearSearch}
              className="p-0.5 rounded-full text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
              title="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </form>

      {/* Live Suggestions Dropdown */}
      {isOpen && searchQuery.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/60 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header info */}
          <div className="px-4 py-2 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400 font-medium border-b border-slate-800/50">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-indigo-400" /> Gợi ý tìm kiếm
            </span>
            <span>{suggestions.length} sản phẩm</span>
          </div>

          {/* Product Items List */}
          {isLoading && suggestions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Đang tìm kiếm sản phẩm...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/40 custom-scrollbar">
              {suggestions.map((product, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 flex items-center gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/50 border-l-2 border-indigo-500 text-white'
                        : 'hover:bg-slate-800/60 text-slate-200'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                      <img
                        src={product.thumbnail || DEFAULT_FALLBACK_IMAGE}
                        alt={product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-100 truncate group-hover:text-indigo-400">
                          {product.name}
                        </h4>
                        {product.discountPrice ? (
                          <span className="text-xs font-bold text-emerald-400 shrink-0">
                            {formatPrice(product.discountPrice)}
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-300 shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                          {product.category?.name || 'Category'}
                        </span>
                        {product.discountPrice && (
                          <span className="text-[10px] text-slate-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              Không tìm thấy sản phẩm nào khớp với &quot;
              <span className="text-slate-200 font-semibold">{searchQuery}</span>
              &quot;
            </div>
          )}

          {/* Footer - See all results button */}
          <button
            type="button"
            onClick={() => handleFormSubmit()}
            onMouseEnter={() => setSelectedIndex(suggestions.length)}
            className={`w-full p-3 bg-slate-950/80 flex items-center justify-between text-xs font-medium transition-colors cursor-pointer ${
              selectedIndex === suggestions.length
                ? 'bg-indigo-900/40 text-indigo-300'
                : 'text-indigo-400 hover:bg-slate-900 hover:text-indigo-300'
            }`}
          >
            <span>
              Xem tất cả kết quả cho &quot;
              <span className="font-semibold">{searchQuery}</span>&quot;
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
