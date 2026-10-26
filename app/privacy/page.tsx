import {
  CheckCircle2,
  ChevronRight,
  EyeOff,
  HelpCircle,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | NextCommerce',
  description: 'Cam kết bảo mật dữ liệu cá nhân, thông tin đơn hàng và quyền riêng tư của khách hàng tại NextCommerce.',
};

export default function PrivacyPage() {
  const lastUpdated = '22/10/2026';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Chính sách bảo mật</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            AN TOÀN & BẢO MẬT DỮ LIỆU
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Chính Sách Bảo Mật Thông Tin
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Tại <strong>NextCommerce</strong>, chúng tôi coi trọng sự tin tưởng của bạn. Chính sách này mô tả cách thức chúng tôi thu thập, lưu trữ, sử dụng và bảo vệ dữ liệu cá nhân của quý khách hàng khi mua sắm tại hệ thống.
          </p>
          <p className="text-xs text-emerald-200/80 pt-1 font-mono">
            Phiên bản hiệu lực từ ngày: {lastUpdated}
          </p>
        </div>
      </div>

      {/* 3 Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">Mã Hóa 256-Bit</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mật khẩu người dùng được băm mã hóa một chiều Bcrypt chuẩn ngành, tuyệt đối không lưu text thuần.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">Không Bán Dữ Liệu</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Cam kết không trao đổi, mua bán hay tiết lộ dữ liệu người dùng cho bất kỳ bên tiếp thị thứ ba nào.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">Toàn Quyền Quản Lý</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bạn có toàn quyền truy cập, cập nhật hoặc yêu cầu hủy bỏ thông tin tài khoản bất kỳ lúc nào.
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-6">
        {/* Section 1 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Mục đích Thu Thập Thông Tin Cá Nhân
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              NextCommerce chỉ thu thập các thông tin cần thiết phục vụ cho các mục đích hợp pháp sau:
            </p>
            <ul className="space-y-1.5 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Xác nhận và xử lý đơn đặt hàng thiết bị công nghệ.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Giao hàng tận nơi qua các đối tác chuyển phát nhanh chuyên nghiệp.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Kích hoạt gói bảo hành điện tử chính hãng và hỗ trợ hậu mãi kỹ thuật.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Gửi thông báo cập nhật trạng thái đơn hàng (qua SMS / Email / Trang tài khoản).</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Phạm Vi Thông Tin Thu Thập
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Các trường dữ liệu chúng tôi thu thập khi bạn đăng ký và tạo đơn gồm:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Họ và tên của người nhận hàng.</li>
              <li>Địa chỉ email và Số điện thoại liên lạc.</li>
              <li>Địa chỉ nhận hàng chi tiết (Số nhà, Phường/Xã, Quận/Huyện, Tỉnh/Thành).</li>
              <li>Lịch sử đơn hàng và các đánh giá sản phẩm do bạn gửi lên hệ thống.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Thời Gian Lưu Trữ & An Toàn Hạ Tầng
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Dữ liệu của bạn được lưu trữ trên hệ thống cơ sở dữ liệu có phân quyền nghiêm ngặt. Thông tin đơn hàng và tài khoản được bảo quản trong suốt thời gian tài khoản còn hoạt động hoặc cho đến khi khách hàng gửi yêu cầu xóa dữ liệu.
            </p>
            <p>
              Mọi kết nối giữa trình duyệt của bạn và máy chủ NextCommerce đều được mã hóa bằng giao thức HTTPS/TLS đạt chuẩn an toàn cao.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Chia Sẻ Cho Đơn Vị Vận Chuyển
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Để hoàn tất việc giao hàng đến tận tay bạn, chúng tôi chỉ cung cấp các thông tin thiết yếu gồm: <strong>Họ tên, Số điện thoại và Địa chỉ nhận hàng</strong> cho đơn vị chuyển phát (như GHTK, Viettel Post hoặc đội ngũ giao hàng riêng của NextCommerce).
            </p>
            <p>
              Các đối tác vận chuyển đều có thỏa thuận cam kết bảo mật thông tin và chỉ sử dụng thông tin vào mục đích giao nhận đơn hàng.
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
              Quyền Hạn Của Khách Hàng
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 pl-11">
            <p>
              Bạn có quyền tự kiểm tra, cập nhật thông tin cá nhân của mình bất kỳ lúc nào bằng cách đăng nhập vào tài khoản tại trang <Link href="/profile" className="text-indigo-600 font-medium underline">Hồ sơ cá nhân</Link>.
            </p>
            <p>
              Nếu muốn yêu cầu xóa toàn bộ thông tin tài khoản hoặc khiếu nại về rò rỉ dữ liệu, bạn có thể liên hệ trực tiếp qua email: <strong>privacy@nextcommerce.vn</strong>.
            </p>
          </div>
        </section>
      </div>

      {/* Support Box */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-base font-bold flex items-center justify-center sm:justify-start gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" /> Cần hỗ trợ về quyền riêng tư?
          </h3>
          <p className="text-xs text-slate-400 max-w-md">
            Chúng tôi luôn lắng nghe và giải quyết thỏa đáng mọi khiếu nại liên quan đến an toàn dữ liệu khách hàng.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/terms"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors border border-slate-700"
          >
            Điều khoản sử dụng
          </Link>
          <a
            href="mailto:support@nextcommerce.vn"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Gửi email hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
}
