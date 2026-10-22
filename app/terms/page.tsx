import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | NextCommerce',
  description: 'Các quy định, điều khoản sử dụng dịch vụ và chính sách giao dịch tại NextCommerce.',
};

export default function TermsPage() {
  const lastUpdated = '22/10/2026';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Điều khoản sử dụng</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold font-mono">
            <FileText className="w-3.5 h-3.5" />
            CHÍNH SÁCH & PHÁP LÝ
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Điều Khoản Sử Dụng Dịch Vụ
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Chào mừng bạn đến với <strong>NextCommerce</strong>. Khi truy cập và mua sắm tại nền tảng của chúng tôi, bạn đồng ý tuân thủ các quy tắc và thỏa thuận dưới đây nhằm bảo đảm quyền lợi chính đáng cho cả hai bên.
          </p>
          <p className="text-xs text-indigo-200/80 pt-1 font-mono">
            Phiên bản hiệu lực từ ngày: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Quick Summary Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3.5 text-xs text-indigo-950 leading-relaxed">
        <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Tóm tắt ngắn gọn:</strong>
          Website NextCommerce cung cấp thiết bị công nghệ chính hãng với hóa đơn minh bạch. Bạn có trách nhiệm bảo mật tài khoản của mình, chúng tôi cam kết giao đúng sản phẩm và hỗ trợ đổi trả trong 7 ngày nếu có lỗi do nhà sản xuất.
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Section 1 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Quy định về Tài khoản Người dùng
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Khi đăng ký tài khoản tại NextCommerce, bạn cần cung cấp thông tin chính xác, đầy đủ về họ tên, số điện thoại, email và địa chỉ nhận hàng để đảm bảo quyền lợi khi nhận hàng và bảo hành.
            </p>
            <p>
              Bạn có trách nhiệm tự bảo vệ mật khẩu đăng nhập của mình. Nếu phát hiện hành vi truy cập trái phép, vui lòng thông báo ngay cho đội ngũ Chăm sóc khách hàng của chúng tôi để được trợ giúp kịp thời.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Thông tin Sản phẩm & Giá niêm yết
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              NextCommerce cam kết cung cấp thông tin trung thực về thông số kỹ thuật, hình ảnh và nguồn gốc xuất xứ của từng sản phẩm. Toàn bộ mức giá hiển thị đã bao gồm thuế Giá trị gia tăng (VAT).
            </p>
            <p>
              Trong trường hợp xảy ra sai sót kỹ thuật hiển thị sai giá bất thường hoặc hết hàng ngoài dự kiến, chúng tôi có quyền liên hệ xác nhận lại hoặc hủy đơn hàng và hoàn trả 100% số tiền đã thanh toán trước (nếu có).
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Chính sách Đặt hàng & Phương thức Thanh toán
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Khách hàng có thể linh hoạt lựa chọn các hình thức thanh toán sau:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700">
              <li><strong>COD (Cash on Delivery):</strong> Thanh toán tiền mặt trực tiếp khi nhận và kiểm tra hàng.</li>
              <li><strong>Chuyển khoản Internet Banking / QR Code:</strong> Chuyển tiền qua tài khoản ngân hàng chính thức của công ty.</li>
              <li><strong>Thẻ quốc tế (Visa / Master):</strong> Cổng thanh toán mã hóa an toàn đạt chuẩn PCI DSS.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Chính sách Giao nhận & Đồng kiểm
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Thời gian giao hàng tiêu chuẩn từ 1 – 3 ngày làm việc đối với khu vực thành phố lớn và từ 3 – 5 ngày đối với các tỉnh thành khác.
            </p>
            <p>
              Khách hàng được quyền <strong>đồng kiểm ngoại quan</strong> trước khi nhận hàng (kiểm tra hộp tem nguyên vẹn, số lượng, đúng model). Nếu phát hiện bao bì móp méo, rách vỡ hoặc sai sản phẩm, bạn có quyền từ chối nhận hàng và báo lại cho tổng đài.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Bảo hành & Đổi trả trong 7 ngày
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Tất cả các sản phẩm điện thoại, máy tính, phụ kiện tại NextCommerce đều được hưởng chính sách bảo hành chính hãng tối thiểu 12 tháng.
            </p>
            <p>
              Áp dụng chính sách <strong>1 đổi 1 trong vòng 7 ngày đầu tiên</strong> nếu phát sinh lỗi phần cứng từ nhà sản xuất với điều kiện thiết bị còn đầy đủ phụ kiện, hộp tem và không có dấu hiệu va đập, rơi nước.
            </p>
          </div>
        </section>
      </div>

      {/* Support Box */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" /> Bạn có thắc mắc về điều khoản?
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            Đội ngũ tư vấn pháp lý và CSKH của NextCommerce luôn sẵn sàng giải đáp mọi câu hỏi của quý khách.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/stores"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors border border-slate-700"
          >
            Hệ thống cửa hàng
          </Link>
          <a
            href="tel:19006868"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Hotline: 1900 6868
          </a>
        </div>
      </div>
    </div>
  );
}
