"use client";

import { useLanguage } from "@/lib/i18n/store";
import { Store } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error(
        language === "vi"
          ? "Vui lòng nhập địa chỉ email hợp lệ"
          : "Please enter a valid email address",
      );
      return;
    }
    toast.success(
      language === "vi"
        ? "Đăng ký nhận bản tin công nghệ thành công!"
        : "Subscribed to tech newsletter successfully!",
    );
    setEmail("");
  };

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface pt-12 pb-8 border-t border-surface-container mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-surface-container">
          {/* Column 1: Brand & Contacts */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-xs">
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="font-headline-sm uppercase tracking-tight text-on-surface font-extrabold">
                NextCommerce
              </span>
            </Link>

            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              {language === "vi"
                ? "Nền tảng thương mại điện tử công nghệ biên tập cao cấp. Định hình trải nghiệm sở hữu thiết bị điện tử, phần cứng máy tính và âm thanh chuyên nghiệp."
                : "High-end editorial electronics and technology commerce. Curating the finest in computing, audio and industrial design."}
            </p>

            <div className="flex flex-col space-y-1 pt-1">
              <span className="font-label-caps text-outline">
                {language === "vi" ? "Tổng đài tư vấn" : "Customer Hotline"}
              </span>
              <span className="font-price-md font-bold text-secondary text-lg">
                1900 6868
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="font-label-caps text-on-surface px-2.5 py-1 bg-surface-container-low rounded">
                CHÍNH HÃNG 100%
              </span>
              <span className="font-label-caps text-secondary px-2.5 py-1 bg-secondary-fixed rounded">
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Column 2: Mua sắm & Danh mục */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-label-caps text-on-surface tracking-wider">
              {language === "vi" ? "Mua sắm & Danh mục" : "Shop & Categories"}
            </h3>
            <ul className="flex flex-col space-y-2 font-body-sm text-on-surface-variant">
              <li>
                <Link
                  href="/products?category=computers-laptops"
                  className="hover:text-secondary transition-colors"
                >
                  {language === "vi"
                    ? "Máy tính xách tay & Workstations"
                    : "Laptops & Workstations"}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=computers-laptops"
                  className="hover:text-secondary transition-colors"
                >
                  {language === "vi"
                    ? "Màn hình đồ họa cao cấp"
                    : "Pro Graphic Displays"}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=electronics-audio"
                  className="hover:text-secondary transition-colors"
                >
                  {language === "vi"
                    ? "Thiết bị âm thanh Audiophile"
                    : "Audiophile Gear & Speakers"}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=computers-laptops"
                  className="hover:text-secondary transition-colors"
                >
                  {language === "vi"
                    ? "Bàn phím cơ & Phụ kiện Custom"
                    : "Mechanical Keyboards"}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home-office"
                  className="hover:text-secondary transition-colors"
                >
                  {language === "vi"
                    ? "Thiết bị làm việc & Công thái học"
                    : "Ergonomic Desk Essentials"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Chính sách & Bảo hộ */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-label-caps text-on-surface tracking-wider">
              {language === "vi" ? "Chính sách & Bảo hộ" : "Policies & Care"}
            </h3>
            <ul className="flex flex-col space-y-2 font-body-sm text-on-surface-variant">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-secondary transition-colors"
                >
                  {t("footer.warrantyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-secondary transition-colors"
                >
                  {language === "vi"
                    ? "Quy trình kiểm định 24 bước"
                    : "24-step Hardware Inspection"}
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="hover:text-secondary transition-colors"
                >
                  {t("footer.orderTracking")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-secondary transition-colors"
                >
                  {t("footer.returnPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-secondary transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-label-caps text-on-surface tracking-wider">
              {language === "vi" ? "Bản tin công nghệ" : "Technology Journal"}
            </h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              {language === "vi"
                ? "Nhận danh mục sản phẩm tuyển chọn và các bài nghiên cứu phần cứng chuyên sâu định kỳ."
                : "Receive curated product monographs and in-depth hardware engineering essays."}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col space-y-2 pt-1"
            >
              <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-surface-container focus-within:border-secondary">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    language === "vi" ? "Email của bạn..." : "Your email..."
                  }
                  className="w-full bg-transparent px-3 py-1.5 font-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-3.5 py-1.5 rounded-md font-label-caps hover:bg-secondary transition-colors shrink-0 cursor-pointer"
                >
                  {language === "vi" ? "ĐĂNG KÝ" : "JOIN"}
                </button>
              </div>
              <span className="font-label-sm text-[11px] text-outline">
                {language === "vi"
                  ? "Không spam. Hủy đăng ký bất cứ lúc nào."
                  : "No spam. Unsubscribe anytime."}
              </span>
            </form>
          </div>
        </div>

        {/* Bottom row: Legal & Payments */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-body-sm text-on-surface-variant text-center md:text-left">
            © {new Date().getFullYear()} NextCommerce Vietnam Joint Stock
            Company.
          </p>

          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-outline">
            <span className="px-2 py-0.5 bg-surface-container-low border border-surface-container rounded">
              COD
            </span>
            <span className="px-2 py-0.5 bg-surface-container-low border border-surface-container rounded text-emerald-600">
              SePay QR
            </span>
            <span className="px-2 py-0.5 bg-surface-container-low border border-surface-container rounded">
              Visa/Master
            </span>
          </div>

          <div className="flex items-center gap-4 text-outline font-label-caps">
            <Link
              href="/terms"
              className="hover:text-on-surface transition-colors"
            >
              {t("footer.termsOfService")}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-on-surface transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/stores"
              className="hover:text-on-surface transition-colors"
            >
              {language === "vi" ? "Cửa hàng" : "Stores"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
