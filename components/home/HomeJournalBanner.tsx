"use client";

import { useLanguage } from "@/lib/i18n/store";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export function HomeJournalBanner() {
  const { language } = useLanguage();

  return (
    <section
      id="journal"
      className="bg-primary-container text-on-secondary-container p-6 md:p-10 mb-12 relative overflow-hidden rounded-sm border border-white/5 shadow-xs scroll-mt-28"
    >
      {/* Abstract Graphic Silhouette Accent in Background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
        <svg
          className="w-full h-full text-secondary"
          fill="currentColor"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.2,-61.7C62.9,-54.3,75.7,-40.4,79.5,-24.1C83.3,-7.8,78.2,10.9,69.5,26.7C60.8,42.5,48.5,55.5,33.9,63.1C19.3,70.7,2.4,72.9,-14.8,70.1C-32,67.3,-49.5,59.5,-60.7,46C-71.9,32.5,-76.8,13.3,-74.6,-4.8C-72.4,-22.9,-63.1,-39.9,-49.9,-47.9C-36.7,-55.9,-19.6,-54.9,-1.2,-53.4C17.2,-51.9,33.5,-69.1,48.2,-61.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-2xl relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-label-caps uppercase tracking-widest text-secondary font-bold text-xs">
            NEXTCOMMERCE JOURNAL // ESSAY N° 04
          </span>
        </div>
        <h2 className="font-headline-lg md:font-display-lg text-white font-bold leading-tight mb-3 text-2xl sm:text-3xl lg:text-4xl">
          {language === "vi"
            ? "Kỷ Nguyên Phần Cứng Tối Giản & Hệ Sinh Thái Không Dây"
            : "The Era of Minimalist Hardware & Wireless Ecosystems"}
        </h2>
        <p className="font-body-md text-on-primary-container mb-6 text-xs sm:text-sm leading-relaxed max-w-xl">
          {language === "vi"
            ? "Khám phá các tiêu chuẩn âm học lossless thế hệ mới, kiến trúc vi xử lý 3nm và phong cách thiết kế không gian làm việc định hình tư duy của những nhà sáng tạo hàng đầu thế giới."
            : "Exploring next-generation lossless acoustic standards, 3nm processor architectures, and workspace aesthetics shaping the vision of global creators."}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-secondary text-on-secondary font-label-caps uppercase font-bold hover:bg-secondary-container transition-colors inline-flex items-center gap-2 text-xs rounded-sm cursor-pointer"
          >
            <span>
              {language === "vi"
                ? "Đọc chuyên đề công nghệ"
                : "Read Tech Monograph"}
            </span>
            <BookOpen className="w-4 h-4" />
          </Link>
          <span className="font-label-caps text-on-primary-container text-xs">
            {language === "vi"
              ? "Thời lượng đọc: 6 phút · Biên soạn bởi NextEditorial"
              : "Read time: 6 mins · Curated by NextEditorial"}
          </span>
        </div>
      </div>
    </section>
  );
}
