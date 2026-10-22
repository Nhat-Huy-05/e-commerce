import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Store as StoreIcon, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HelpCircle,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { StoreListClient } from '@/components/stores/StoreListClient';

export const metadata: Metadata = {
  title: 'Hệ Thống Cửa Hàng | NextCommerce',
  description: 'Danh sách showroom và địa chỉ các cửa hàng NextCommerce tại Huế, Đà Nẵng, Hà Nội và TP. Hồ Chí Minh.',
};

export default function StoresPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Hệ thống cửa hàng</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold font-mono">
            <StoreIcon className="w-3.5 h-3.5" />
            SHOWROOM TRẢI NGHIỆM TOÀN QUỐC
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Hệ Thống Cửa Hàng NextCommerce
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Ghé thăm các showroom hiện đại của NextCommerce để trực tiếp chạm, nghe và cảm nhận các thiết bị công nghệ mới nhất trước khi mua sắm. Đội ngũ chuyên viên kỹ thuật luôn sẵn sàng phục vụ quý khách.
          </p>
        </div>
      </div>

      {/* 4 Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">04</span>
          <p className="text-[11px] font-bold text-slate-700 uppercase font-mono">Showroom Lớn</p>
          <p className="text-[10px] text-slate-500">Huế, Đà Nẵng, HN, HCM</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">63</span>
          <p className="text-[11px] font-bold text-slate-700 uppercase font-mono">Tỉnh Thành</p>
          <p className="text-[10px] text-slate-500">Giao hàng hỏa tốc toàn quốc</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">100%</span>
          <p className="text-[11px] font-bold text-slate-700 uppercase font-mono">Chính Hãng</p>
          <p className="text-[10px] text-slate-500">Bảo hành 12 tháng 1 đổi 1</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-rose-600 font-mono">24/7</span>
          <p className="text-[11px] font-bold text-slate-700 uppercase font-mono">Hỗ Trợ Kỹ Thuật</p>
          <p className="text-[10px] text-slate-500">Hotline 1900 6868 miễn phí</p>
        </div>
      </div>

      {/* Main Interactive Store List */}
      <StoreListClient />

      {/* In-store Special Perks */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Đặc quyền khi trải nghiệm trực tiếp tại Cửa hàng
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Dùng thử sản phẩm thoải mái</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mọi mẫu điện thoại, laptop, tai nghe đều có máy mẫu sẵn sàng để bạn trải nghiệm chất âm, màn hình và hiệu năng.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Kỹ thuật viên cài đặt 1-1</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hỗ trợ chuyển dữ liệu danh bạ, ảnh từ máy cũ sang máy mới hoàn toàn miễn phí ngay tại bàn tư vấn.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">Ưu đãi giảm giá độc quyền</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nhận voucher giảm giá trực tiếp và combo phụ kiện giá ưu đãi khi check-in mua sắm tại cửa hàng.
            </p>
          </div>
        </div>
      </div>

      {/* Support Box */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
            <Headphones className="w-5 h-5 text-indigo-400" /> Bạn không tiện ghé cửa hàng?
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            Đặt hàng trực tuyến giao tận nhà siêu tốc. Hỗ trợ kiểm tra máy trước khi thanh toán COD hoàn toàn an tâm.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/products"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Khám phá sản phẩm
          </Link>
          <a
            href="tel:19006868"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors border border-slate-700"
          >
            Hotline: 1900 6868
          </a>
        </div>
      </div>
    </div>
  );
}
