'use client';

import { ProductWithCategory } from '@/lib/types';
import { ArrowRight, Loader2, Search, Tag, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

export function HeaderSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

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
      className="flex-1 max-w-lg lg:max-w-xl hidden sm:block relative z-50"
    >
      <form onSubmit={handleFormSubmit} className="relative flex items-center">
        {/* Search Icon that smoothly collapses and fades out on focus or when typing */}
        <div
          className={`absolute left-4 flex items-center pointer-events-none transition-all duration-300 ease-out origin-left ${
            isFocused || searchQuery
              ? 'opacity-0 scale-50 -translate-x-3 pointer-events-none'
              : 'opacity-100 scale-100 translate-x-0'
          }`}
        >
          <Search className="w-4.5 h-4.5 text-slate-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder={isFocused ? 'Nhập tên sản phẩm để tìm...' : 'Tìm kiếm sản phẩm...'}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (searchQuery.trim()) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full bg-slate-100/90 border rounded-full py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 ${
            isFocused || searchQuery
              ? 'pl-4 bg-white border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
              : 'pl-11 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
          }`}
          style={{ outline: 'none' }}
        />

        {/* Right side loading spinner or clear button */}
        <div className="absolute right-3.5 flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
          ) : searchQuery ? (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              title="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </form>

      {/* Live Suggestions Dropdown */}
      {isOpen && searchQuery.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full mt-2.5 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header info */}
          <div className="px-4 py-2.5 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium border-b border-slate-200">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Tag className="w-3.5 h-3.5 text-indigo-600" /> Gợi ý tìm kiếm
            </span>
            <span>{suggestions.length} sản phẩm</span>
          </div>

          {/* Product Items List */}
          {isLoading && suggestions.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 flex items-center justify-center gap-2.5">
              <Loader2 className="w-4.5 h-4.5 text-indigo-600 animate-spin" />
              <span>Đang tìm kiếm sản phẩm...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
              {suggestions.map((product, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3.5 flex items-center gap-3.5 transition-colors cursor-pointer ${isSelected
                      ? 'bg-indigo-50 border-l-2 border-indigo-600 text-indigo-950'
                      : 'hover:bg-slate-50 text-slate-800'
                      }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
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
                        <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600">
                          {product.name}
                        </h4>
                        {product.discountPrice ? (
                          <span className="text-sm font-bold text-emerald-600 shrink-0">
                            {formatPrice(product.discountPrice)}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-slate-800 shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                          {product.category?.name || 'Category'}
                        </span>
                        {product.discountPrice && (
                          <span className="text-xs text-slate-400 line-through">
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
            <div className="p-8 text-center text-sm text-slate-500">
              Không tìm thấy sản phẩm nào khớp với &quot;
              <span className="text-slate-800 font-semibold">{searchQuery}</span>
              &quot;
            </div>
          )}

          {/* Footer - See all results button */}
          <button
            type="button"
            onClick={() => handleFormSubmit()}
            onMouseEnter={() => setSelectedIndex(suggestions.length)}
            className={`w-full p-3.5 bg-slate-50 flex items-center justify-between text-xs font-semibold transition-colors cursor-pointer ${selectedIndex === suggestions.length
              ? 'bg-indigo-100 text-indigo-800'
              : 'text-indigo-600 hover:bg-slate-100 hover:text-indigo-700'
              }`}
          >
            <span>
              Xem tất cả kết quả cho &quot;
              <span className="font-bold">{searchQuery}</span>&quot;
            </span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
