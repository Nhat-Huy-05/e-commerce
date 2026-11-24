"use client";

import { ProductWithCategory } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/store";
import { ArrowRight, Loader2, Search, Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";

export function HeaderSearch() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
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
        console.error("Error fetching search suggestions:", error);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      if (e.key === "ArrowDown" && searchQuery.trim()) {
        setIsOpen(true);
      }
      return;
    }

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length ? prev + 1 : prev));
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    }
    // Escape
    else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div ref={containerRef} className="w-full relative z-50">
      <form onSubmit={handleFormSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-outline">
          <Search className="w-4 h-4 text-outline" />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder={
            isFocused
              ? language === "vi"
                ? "Nhập tên sản phẩm để tìm..."
                : "Type product name to search..."
              : language === "vi"
                ? "Tìm kiếm sản phẩm, thương hiệu hoặc phụ kiện công nghệ..."
                : "Search products, brands or tech gear..."
          }
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
          className={`w-full bg-surface-container-low border border-transparent rounded-lg py-2.5 pl-10 pr-10 font-body-sm text-sm text-on-surface placeholder:text-outline transition-all outline-none focus:outline-none focus:border-secondary focus:bg-surface-container-lowest ${
            isFocused
              ? "shadow-xs border-secondary"
              : "hover:bg-surface-container"
          }`}
        />

        {/* Right side loading spinner or clear button */}
        <div className="absolute right-3 flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-secondary animate-spin" />
          ) : searchQuery ? (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              title={language === "vi" ? "Xóa tìm kiếm" : "Clear search"}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </div>
      </form>

      {/* Live Suggestions Dropdown */}
      {isOpen && searchQuery.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest border border-surface-container rounded-xl shadow-xl overflow-hidden z-50 divide-y divide-surface-container animate-in fade-in duration-150">
          {/* Header info */}
          <div className="px-3.5 py-2 bg-surface-container-low flex items-center justify-between text-xs text-outline font-medium">
            <span className="flex items-center gap-1.5 font-label-caps text-on-surface">
              <Tag className="w-3.5 h-3.5 text-secondary" />{" "}
              {language === "vi" ? "GỢI Ý TÌM KIẾM" : "SEARCH SUGGESTIONS"}
            </span>
            <span className="font-mono text-[11px]">
              {suggestions.length} {language === "vi" ? "sản phẩm" : "products"}
            </span>
          </div>

          {/* Product Items List */}
          {isLoading && suggestions.length === 0 ? (
            <div className="p-6 text-center text-sm text-outline flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-secondary animate-spin" />
              <span>
                {language === "vi"
                  ? "Đang tìm kiếm sản phẩm..."
                  : "Searching products..."}
              </span>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="max-h-80 overflow-y-auto divide-y divide-surface-container">
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
                        ? "bg-surface-container-low text-secondary"
                        : "hover:bg-surface-container-low/60 text-on-surface"
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-surface-container-low shrink-0 border border-surface-container p-1 flex items-center justify-center">
                      <img
                        src={product.thumbnail || DEFAULT_FALLBACK_IMAGE}
                        alt={product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-title-md text-xs sm:text-sm text-on-surface truncate">
                          {product.name}
                        </h4>
                        {product.discountPrice ? (
                          <span className="font-price-md text-xs sm:text-sm text-error shrink-0 font-bold">
                            {formatPrice(product.discountPrice)}
                          </span>
                        ) : (
                          <span className="font-price-md text-xs sm:text-sm text-on-surface shrink-0 font-bold">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-label-caps text-[10px] text-outline">
                          {product.category?.name || "Category"}
                        </span>
                        {product.discountPrice && (
                          <span className="font-mono text-[11px] text-outline line-through">
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
            <div className="p-6 text-center text-sm text-outline">
              {language === "vi"
                ? "Không tìm thấy sản phẩm nào khớp với "
                : "No products matched for "}
              &quot;
              <span className="text-on-surface font-semibold">
                {searchQuery}
              </span>
              &quot;
            </div>
          )}

          {/* Footer - See all results button */}
          <button
            type="button"
            onClick={() => handleFormSubmit()}
            onMouseEnter={() => setSelectedIndex(suggestions.length)}
            className={`w-full p-3 bg-surface-container-low flex items-center justify-between text-xs font-label-caps transition-colors cursor-pointer ${
              selectedIndex === suggestions.length
                ? "text-secondary font-bold"
                : "text-on-surface hover:text-secondary"
            }`}
          >
            <span>
              {language === "vi"
                ? "Xem tất cả kết quả cho "
                : "View all results for "}
              &quot;<span className="font-bold">{searchQuery}</span>&quot;
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
