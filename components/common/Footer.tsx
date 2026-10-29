'use client';

import { useLanguage } from '@/lib/i18n/store';
import {
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-10">
      {/* Main Compact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-12">
          {/* Brand Info & 1-line Contacts */}
          <div className="space-y-2.5 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-tight text-slate-900 font-mono">
                Next<span className="text-indigo-600">Commerce</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'vi'
                ? 'Hệ thống bán lẻ thiết bị công nghệ & phong cách sống chính hãng. Mua sắm an tâm với dịch vụ chăm sóc 24/7.'
                : 'Premium genuine technology and lifestyle retailer. Reliable online shopping with 24/7 customer support.'}
            </p>

            {/* Compact inline contact line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-0.5">
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <Phone className="w-3 h-3 text-indigo-600" /> 1900 6868
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-indigo-600" /> support@nextcommerce.vn
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-600" /> TP. Huế, VN
              </span>
            </div>
          </div>

          {/* Quick Links in 2 compact columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 text-xs shrink-0 w-full sm:w-auto">
            {/* Column 1: Mua sắm */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
                {language === 'vi' ? 'Mua sắm' : 'Shop'}
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <Link href="/products" className="hover:text-indigo-600 transition-colors">
                    {language === 'vi' ? 'Tất cả sản phẩm' : 'All Products'}
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-indigo-600 transition-colors">
                    {language === 'vi' ? 'Điện thoại & Tablet' : 'Phones & Tablets'}
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-indigo-600 transition-colors">
                    {language === 'vi' ? 'Laptop & Máy tính' : 'Laptops & PCs'}
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-indigo-600 transition-colors">
                    {language === 'vi' ? 'Âm thanh & Phụ kiện' : 'Audio & Gadgets'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Hỗ trợ & Chính sách */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
                {language === 'vi' ? 'Hỗ trợ' : 'Support'}
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <Link href="/orders" className="hover:text-indigo-600 transition-colors">
                    {t('footer.orderTracking')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                    {t('footer.warrantyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                    {t('footer.returnPolicy')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                    {t('footer.privacyPolicy')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Single-line Minimal Bottom Bar */}
      <div className="border-t border-slate-100 py-3 bg-slate-50 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2.5 text-center md:text-left">
          {/* Copyright & Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© {new Date().getFullYear()} NextCommerce Inc.</span>
            <span>•</span>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              {t('footer.termsOfService')}
            </Link>
            <span>•</span>
            <Link href="/stores" className="hover:text-indigo-600 transition-colors">
              {language === 'vi' ? 'Cửa hàng' : 'Stores'}
            </Link>
          </div>

          {/* Payment Methods Badges & Socials */}
          <div className="flex items-center gap-3">
            {/* Payment badges */}
            <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-slate-600">
              <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">COD</span>
              <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-emerald-600">SePay QR</span>
              <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">Visa/Master</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2.5">
              <a
                href="#"
                className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-colors"
                title="Website"
              >
                <Globe className="w-3 h-3" />
              </a>
              <a
                href="#"
                className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-colors"
                title="Share"
              >
                <Share2 className="w-3 h-3" />
              </a>
              <a
                href="#"
                className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-colors"
                title="Support Chat"
              >
                <MessageCircle className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
