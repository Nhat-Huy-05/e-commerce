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
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-12 sm:mt-16">

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 font-mono">
                Next<span className="text-indigo-600">Commerce</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Hệ thống bán lẻ thiết bị công nghệ & phong cách sống chính hãng hàng đầu. Trải nghiệm mua sắm trực tuyến an tâm với dịch vụ chăm sóc khách hàng tận tâm 24/7.
            </p>

            <div className="space-y-2.5 text-xs text-slate-600 pt-1">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Trụ sở: 77 Nguyễn Huệ, Phường Phú Nhuận, TP. Huế, Thừa Thiên Huế</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Hotline CSKH: <strong className="text-slate-900 font-bold">1900 6868</strong> (8:00 - 21:30)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Email: <strong className="text-slate-900 font-bold">support@nextcommerce.vn</strong></span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Thời gian làm việc: Thứ 2 – Chủ Nhật (Cả ngày lễ)</span>
              </p>
            </div>
          </div>

          {/* Column 2: Danh Mục */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
              Danh Mục Nổi Bật
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Điện thoại & Tablet
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Laptop & Máy tính
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Âm thanh & Phụ kiện
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Bộ sưu tập mới 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ trợ & Chính sách */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/orders" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Tra cứu đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Chính sách bảo hành 12 tháng
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Chính sách đổi trả & hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  Bảo mật thông tin khách hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kết nối & Thanh toán */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
              Kết Nối & Thanh Toán
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Chia sẻ"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                title="Tư vấn trực tuyến"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-700 mb-1.5 uppercase font-mono tracking-wide">
                Phương Thức Thanh Toán
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">COD</span>
                <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">Internet Banking</span>
                <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">Visa / Master</span>
                <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 py-5 bg-slate-50 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} <strong className="text-slate-900 font-semibold">NextCommerce Inc.</strong> Bùi Nguyễn Nhật Huy</p>
          <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-medium">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              Điều khoản sử dụng
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Chính sách bảo mật
            </Link>
            <span>•</span>
            <Link href="/stores" className="hover:text-indigo-600 transition-colors">
              Hệ thống cửa hàng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
