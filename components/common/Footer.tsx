'use client';

import { useLanguage } from '@/lib/i18n/store';
import {
  Clock,
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
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-12 sm:mt-16">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 font-mono">
                Next<span className="text-indigo-600">Commerce</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              {t('footer.brandDescription')}
            </p>

            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{t('footer.headquarters')}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{t('footer.hotline')}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{t('footer.email')}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Danh Mục */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
              {t('footer.featuredCategories')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {language === 'vi' ? 'Tất cả sản phẩm' : 'All Products'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {language === 'vi' ? 'Điện thoại & Tablet' : 'Phones & Tablets'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {language === 'vi' ? 'Laptop & Máy tính' : 'Laptops & Computers'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {language === 'vi' ? 'Âm thanh & Phụ kiện' : 'Audio & Accessories'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {language === 'vi' ? 'Bộ sưu tập mới 2026' : 'New Collection 2026'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ trợ & Chính sách */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
              {t('footer.customerCare')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/orders" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {t('footer.orderTracking')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {t('footer.warrantyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {t('footer.returnPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {t('footer.paymentPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kết nối & Thanh toán */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
              {language === 'vi' ? 'Kết Nối & Thanh Toán' : 'Connect & Payment'}
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Chia sẻ"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Tư vấn trực tuyến"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-1">
              <p className="text-[10px] font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wide">
                {t('footer.paymentMethods')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">COD</span>
                <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">SePay QR</span>
                <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">Visa/Master</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 py-3.5 bg-slate-50 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <p>© {new Date().getFullYear()} <strong className="text-slate-900 font-semibold">NextCommerce Inc.</strong> Bùi Nguyễn Nhật Huy</p>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-medium">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              {t('footer.termsOfService')}
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span>•</span>
            <Link href="/stores" className="hover:text-indigo-600 transition-colors">
              {language === 'vi' ? 'Hệ thống cửa hàng' : 'Store Locations'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
