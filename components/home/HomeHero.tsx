"use client";

import { useLanguage } from "@/lib/i18n/store";
import { ProductWithCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Gift,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface HomeHeroProps {
  products?: ProductWithCategory[];
}

export function HomeHero({ products = [] }: HomeHeroProps) {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Sort or prioritize Apex Phone if available as first slide, then up to 4 featured products
  const featuredSlides = useMemo(() => {
    if (!products.length) return [];
    const list = [...products];
    const apexIdx = list.findIndex(
      (p) =>
        p.slug.toLowerCase().includes("apex") ||
        p.name.toLowerCase().includes("apex"),
    );
    if (apexIdx > -1 && list[apexIdx]) {
      const [apex] = list.splice(apexIdx, 1);
      if (apex) list.unshift(apex);
    }
    return list.slice(0, 4);
  }, [products]);

  const totalSlides = featuredSlides.length || 1;
  const activeProduct = featuredSlides[currentSlide] || products[0];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play interval (5s) - paused on hover or touch
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  // Touch swipe handlers
  const minSwipeDistance = 45;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches && e.targetTouches.length > 0 && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches.length > 0 && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const handleCopyVoucher = () => {
    navigator.clipboard?.writeText("APEX500");
    toast.success(
      language === "vi"
        ? "Đã sao chép mã ưu đãi APEX500! Đơn từ 2.000.000₫"
        : "Copied voucher code APEX500! Orders over 2,000,000₫",
    );
  };

  if (!activeProduct) {
    return null;
  }

  // Price calculations
  const originalPrice = activeProduct.price;
  const currentPrice = activeProduct.discountPrice || activeProduct.price;
  const hasDiscount =
    activeProduct.discountPrice &&
    activeProduct.price > activeProduct.discountPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 7;
  const savingsAmount = hasDiscount ? originalPrice - currentPrice : 0;

  // Custom spec tags dynamically extracted or fallback to flagship specifications
  const specPills = [
    '6.9" ProMotion 120Hz',
    "A18 Pro 3nm",
    "512GB NVMe",
    "Pin 33h",
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
      {/* 1. Main Spotlight (8 cols) */}
      <div
        className="lg:col-span-8 bg-surface-container-lowest p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border border-surface-container rounded-sm shadow-2xs"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Top Labels */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-on-primary font-label-caps px-2.5 py-1 uppercase tracking-widest text-[10px]">
              {language === "vi"
                ? "Ấn Phẩm Công Nghệ Tháng"
                : "Technology Monograph"}
            </span>
            <span className="bg-error text-on-error font-label-caps px-2.5 py-1 uppercase font-bold tracking-wider text-[10px]">
              -{discountPercent}%{" "}
              {language === "vi" ? "SIÊU SALE" : "FLASH SALE"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-label-caps text-outline bg-surface-container-low px-2.5 py-1 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>CHÍNH HÃNG VN/A</span>
          </div>
        </div>

        {/* Asymmetric Typography & Product Photography Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10 my-auto">
          <div className="md:col-span-7 flex flex-col">
            <span className="font-label-caps uppercase text-secondary font-semibold mb-1 text-[11px]">
              Flagship Specification // N° 16
            </span>
            <h1 className="font-headline-lg md:font-display-lg text-on-surface tracking-tight leading-tight mb-2">
              {activeProduct.name}
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-md mb-4 line-clamp-3 leading-relaxed">
              {activeProduct.description ||
                "Khung Titan Sa Mạc chuẩn hàng không vũ trụ. Vi xử lý Apple A18 Pro 3nm mạnh mẽ bậc nhất cùng hệ thống camera tiềm vọng 5x thế hệ mới."}
            </p>

            {/* Technical Spec Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {specPills.map((pill, idx) => (
                <span
                  key={idx}
                  className="font-label-caps text-[10px] px-2 py-1 bg-surface-container-low text-on-surface border border-surface-container"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Pricing & Savings */}
            <div className="flex flex-wrap items-baseline gap-2.5 mb-4">
              <span className="font-price-lg text-2xl md:text-3xl text-secondary font-bold tracking-tight">
                {formatCurrency(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="font-price-md text-outline line-through text-sm">
                  {formatCurrency(originalPrice)}
                </span>
              )}
              {savingsAmount > 0 && (
                <span className="font-label-caps text-[10px] font-bold text-error bg-error-container/40 px-2 py-0.5">
                  {language === "vi" ? "Tiết kiệm " : "Save "}
                  {formatCurrency(savingsAmount)}
                </span>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-6">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-on-surface font-title-md text-sm">
                  {activeProduct.rating.toFixed(1)}
                </span>
                <span className="font-normal text-outline ml-1 font-mono text-[11px]">
                  ({activeProduct.reviewCount}{" "}
                  {language === "vi" ? "đánh giá" : "reviews"})
                </span>
              </div>
              <span className="text-outline">/</span>
              <div className="flex items-center text-secondary gap-1 font-label-caps text-[11px]">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {language === "vi" ? "Freeship toàn quốc" : "Free Delivery"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={`/products/${activeProduct.slug}`}
                className="px-5 py-3 bg-primary text-on-primary font-label-caps uppercase font-bold hover:bg-secondary transition-colors inline-flex items-center gap-2 text-xs"
              >
                <span>
                  {language === "vi" ? "Xem sản phẩm ngay" : "Shop Now"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/products/${activeProduct.slug}`}
                className="px-4 py-3 bg-surface-container text-on-surface font-label-caps uppercase font-semibold hover:bg-surface-container-high transition-colors text-xs"
              >
                {language === "vi" ? "So sánh cấu hình" : "Compare Specs"}
              </Link>
            </div>
          </div>

          {/* Product Photography Container */}
          <div className="md:col-span-5 relative flex items-center justify-center p-2">
            <Link
              href={`/products/${activeProduct.slug}`}
              className="w-full aspect-[4/5] bg-surface-container-low overflow-hidden relative flex items-center justify-center p-4 group/img border border-surface-container"
            >
              <img
                src={
                  activeProduct.thumbnail ||
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"
                }
                alt={activeProduct.name}
                className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-1 font-label-caps text-[9px] text-on-surface uppercase border border-surface-container">
                EDITION // TITAN SA MẠC
              </div>
            </Link>
          </div>
        </div>

        {/* Carousel Footer & Slide Indicators */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-container z-10 text-xs">
          <span className="font-label-caps text-outline text-[10px]">
            CATALOGUE REF. 2026.11
          </span>
          <div className="flex items-center gap-2">
            {totalSlides > 1 && (
              <div className="flex items-center gap-1 mr-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="p-1 hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                  title="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="p-1 hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                  title="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 transition-all cursor-pointer ${
                    currentSlide === idx
                      ? "w-6 bg-secondary"
                      : "w-2 bg-surface-variant hover:bg-outline"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Side-rail Blocks (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Voucher Block */}
        <div className="bg-gradient-to-br from-[#E84E36] to-[#C9331D] text-white p-6 flex flex-col justify-between relative overflow-hidden flex-1 shadow-2xs rounded-sm">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-[9px] uppercase tracking-widest bg-black/25 px-2 py-0.5 rounded-xs">
                {language === "vi" ? "VOUCHER ĐỘC QUYỀN" : "EXCLUSIVE VOUCHER"}
              </span>
              <Gift className="w-4 h-4 opacity-80" />
            </div>
            <h2 className="font-headline-md text-white font-bold tracking-tight mb-2">
              {language === "vi" ? "Giảm Ngay 500.000₫" : "Save 500,000₫ Today"}
            </h2>
            <p className="font-body-sm opacity-90 mb-4 leading-relaxed text-xs">
              {language === "vi"
                ? "Áp dụng cho mọi hóa đơn công nghệ từ 2.000.000₫. Số lượng giới hạn cho thành viên NextCommerce."
                : "Applies to tech orders from 2,000,000₫. Limited allocation for members."}
            </p>
            <div className="bg-black/25 p-2.5 flex items-center justify-between font-label-caps text-xs tracking-wider">
              <span className="opacity-75 text-[10px]">
                {language === "vi" ? "MÃ ƯU ĐÃI:" : "CODE:"}
              </span>
              <span className="font-bold text-white text-[12px] bg-white/20 px-2 py-0.5 font-mono">
                APEX500
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyVoucher}
            className="mt-4 w-full py-2.5 bg-white text-[#C9331D] font-label-caps uppercase font-bold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <span>{language === "vi" ? "Lấy mã ngay" : "Claim Voucher"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service Guarantee Block */}
        <div className="bg-primary-container text-on-secondary-container p-6 flex flex-col justify-between flex-1 shadow-2xs rounded-sm border border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-secondary text-on-secondary font-label-caps text-[9px] px-2 py-0.5 uppercase font-bold">
                FREESHIP 0Đ
              </span>
              <span className="font-label-caps text-[9px] text-on-primary-container uppercase">
                {language === "vi" ? "HỎA TỐC 2 GIỜ" : "2-HOUR DISPATCH"}
              </span>
            </div>
            <h3 className="font-headline-sm font-bold text-white mb-2">
              {language === "vi"
                ? "Giao Hỏa Tốc & 1 Đổi 1"
                : "Express Delivery & 1:1 Exchange"}
            </h3>
            <p className="font-body-sm text-on-primary-container mb-4 text-xs leading-relaxed">
              {language === "vi"
                ? "Đổi trả tận nơi trong 30 ngày nếu có lỗi phần cứng. Kỹ thuật viên NextCare hỗ trợ setup thiết bị tận bàn làm việc."
                : "30-day on-site replacement for hardware issues. NextCare certified setup at your desk."}
            </p>
            <div className="flex flex-col gap-2 text-xs text-on-primary-container">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white text-xs">
                  {language === "vi"
                    ? "Bảo hành chính hãng 12-24 tháng Apple, Sony, Dell"
                    : "12-24 months warranty from Apple, Sony, Dell"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white text-xs">
                  {language === "vi"
                    ? "Hóa đơn VAT điện tử & kiểm định 24 bước"
                    : "Electronic VAT invoice & 24-step verification"}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-label-caps text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />{" "}
              {language === "vi" ? "Chính hãng 100%" : "100% Genuine"}
            </span>
            <Link
              href="/terms"
              className="text-white hover:text-secondary-fixed font-label-caps uppercase flex items-center gap-1 text-[10px] transition-colors"
            >
              <span>{language === "vi" ? "Chi tiết" : "Details"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
