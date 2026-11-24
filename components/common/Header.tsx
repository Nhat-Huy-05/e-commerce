"use client";

import { useAuth } from "@/lib/auth-store";
import { useLanguage } from "@/lib/i18n/store";
import { useCart } from "@/lib/store";
import {
  LogIn,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { HeaderSearch } from "./HeaderSearch";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const cartItems = useCart((state) => state.items);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;
  const currentUser = mounted ? user : null;

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    {
      href: "/",
      labelVi: "Trang chủ",
      labelEn: "Home",
      isActive: pathname === "/",
    },
    {
      href: "/products",
      labelVi: "Sản phẩm",
      labelEn: "Products",
      isActive: pathname === "/products",
    },
    {
      href: "/#categories",
      labelVi: "Khám phá danh mục",
      labelEn: "Categories",
      isActive: false,
    },
    {
      href: "/#flash-deals",
      labelVi: "Bộ sưu tập Deals",
      labelEn: "Deals Collection",
      isActive: false,
    },
    {
      href: "/#journal",
      labelVi: "Tin công nghệ",
      labelEn: "Tech Journal",
      isActive: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container">
      {/* 1. Announcement Bar */}
      <div className="bg-primary-container text-on-secondary-container py-1.5 px-4 sm:px-6 lg:px-8 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="font-label-caps text-on-primary-container hidden md:inline-block">
            DIRECT DISPATCH // VN SPEC
          </span>
          <p className="font-label-sm text-center flex-1 font-medium text-white/90 truncate">
            {language === "vi"
              ? "Giao hàng hỏa tốc trong 2h tại TP.HCM & Hà Nội — Bảo hành chính hãng 100%"
              : "2-hour express dispatch in HCMC & Hanoi — 100% Genuine Guaranteed"}
          </p>
          <div className="flex items-center gap-2 font-label-caps text-on-primary-container shrink-0">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`transition-colors cursor-pointer ${
                language === "vi"
                  ? "text-white font-bold underline underline-offset-4"
                  : "hover:text-white opacity-70"
              }`}
            >
              VI
            </button>
            <span className="opacity-40">/</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`transition-colors cursor-pointer ${
                language === "en"
                  ? "text-white font-bold underline underline-offset-4"
                  : "hover:text-white opacity-70"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-headline-sm uppercase tracking-tight text-on-surface font-extrabold">
            NextCommerce
          </span>
        </Link>

        {/* Live Search */}
        <div className="flex-1 max-w-xl hidden sm:block">
          <HeaderSearch />
        </div>

        {/* User Account & Cart Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 font-bold text-xs">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-title-md text-sm leading-none text-on-surface truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="font-label-caps text-[10px] text-secondary font-semibold mt-1">
                    {currentUser.role === "admin" ? "ADMIN" : "TITANIUM MEMBER"}
                  </span>
                </div>
              </Link>

              {currentUser.role === "admin" && (
                <Link
                  href="/admin/products"
                  className="flex items-center gap-1 py-2 px-2.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold border border-purple-200 transition-colors"
                  title={t("header.admin")}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="hidden lg:inline">{t("header.admin")}</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-lg text-outline hover:text-error hover:bg-error-container/30 transition-colors cursor-pointer"
                title={t("common.logout")}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-secondary font-label-caps text-xs font-bold uppercase transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>{t("common.login")}</span>
            </Link>
          )}

          {/* Cart Trigger */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center p-2.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
            title={t("common.cart")}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary font-label-caps text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar for small screens */}
      <div className="sm:hidden px-4 pb-2.5">
        <HeaderSearch />
      </div>

      {/* 3. Category Sub-Navigation Bar */}
      <div className="bg-surface-container-lowest border-t border-surface-container/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg font-title-md text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  link.isActive
                    ? "text-secondary font-bold bg-surface-container-low"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/60"
                }`}
              >
                {language === "vi" ? link.labelVi : link.labelEn}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
