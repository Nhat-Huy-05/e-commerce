'use client';

import { useAuth } from '@/lib/auth-store';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Key,
  Lock,
  LogIn,
  Mail,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const setUser = useAuth((state) => state.setUser);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<'request' | 'verify' | 'success'>('request');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      setUser(data.user);

      if (redirectTo) {
        router.push(redirectTo);
      } else if (data.user.role === 'admin') {
        router.push('/admin/products');
      } else {
        router.push('/profile');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  const fastLogin = async (fastEmail: string, fastPass: string) => {
    setEmail(fastEmail);
    setPassword(fastPass);
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fastEmail, password: fastPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      setUser(data.user);

      if (redirectTo) {
        router.push(redirectTo);
      } else if (data.user.role === 'admin') {
        router.push('/admin/products');
      } else {
        router.push('/profile');
      }
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open modal handler
  const handleOpenForgotModal = () => {
    setForgotEmail(email); // Pre-fill email if user already typed it
    setOtp('');
    setDemoOtp('');
    setNewPassword('');
    setShowNewPassword(false);
    setConfirmPassword('');
    setShowConfirmPassword(false);
    setForgotError('');
    setForgotSuccess('');
    setForgotStep('request');
    setShowForgotModal(true);
  };

  // Close modal handler
  const handleCloseForgotModal = () => {
    setShowForgotModal(false);
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError('Vui lòng nhập Email của bạn');
      return;
    }

    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể gửi mã OTP');
      }

      if (data.otp) {
        setDemoOtp(data.otp);
      }
      setForgotSuccess(data.message || 'Mã OTP đã được gửi đến email!');
      setForgotStep('verify');
    } catch (err: any) {
      setForgotError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Verify OTP and reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!otp || otp.trim().length !== 6) {
      setForgotError('Mã OTP phải gồm đúng 6 chữ số');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setForgotError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError('Mật khẩu xác nhận không khớp');
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Xác thực OTP thất bại');
      }

      setForgotSuccess(data.message || 'Đổi mật khẩu thành công!');
      // Update form state with new credentials
      setEmail(forgotEmail);
      setPassword(newPassword);
      setForgotStep('success');
    } catch (err: any) {
      setForgotError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-4">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl relative">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-xs">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Đăng nhập Tài khoản</h1>
          {redirectTo ? (
            <p className="text-xs text-amber-600 font-semibold flex items-center justify-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              Đăng nhập để thêm sản phẩm vào giỏ hàng
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Chọn tài khoản để trải nghiệm các phân quyền khác nhau
            </p>
          )}
        </div>

        {/* 1-Click Fast Login Section */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fastLogin('admin@commerce.com', 'adminpassword123')}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" /> Admin
            </button>
            <button
              type="button"
              onClick={() => fastLogin('customer@example.com', 'customerpassword123')}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" /> Customer
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email hoặc Tên người dùng
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email hoặc Tên người dùng (username)"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-slate-400" /> Mật khẩu
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Feature Request: Quên mật khẩu ngay bên dưới dòng Mật khẩu */}
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={handleOpenForgotModal}
                className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-semibold cursor-pointer transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Đăng ký Khách hàng mới
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5 relative text-xs text-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Khôi phục Mật khẩu</h3>
              </div>
              <button
                onClick={handleCloseForgotModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error & Success Messages */}
            {forgotError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-center">
                ⚠️ {forgotError}
              </div>
            )}
            {forgotSuccess && forgotStep !== 'success' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-center">
                ✓ {forgotSuccess}
              </div>
            )}

            {/* STEP 1: Enter Email & Request OTP */}
            {forgotStep === 'request' && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Nhập địa chỉ Email (Gmail) liên kết với tài khoản của bạn để nhận mã OTP xác thực.
                </p>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" /> Nhập Email / Gmail
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseForgotModal}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-2/3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? 'Đang gửi OTP...' : 'Gửi mã OTP'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Enter OTP & New Password */}
            {forgotStep === 'verify' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {demoOtp && (
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 flex items-center justify-between">
                    <span className="font-semibold">Mã OTP thử nghiệm:</span>
                    <span className="font-mono text-sm font-bold bg-indigo-100 px-2.5 py-1 rounded-lg text-indigo-900 tracking-widest border border-indigo-200">
                      {demoOtp}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Mã OTP (6 chữ số)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-center tracking-widest text-lg font-mono text-indigo-700 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" /> Mật khẩu mới
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" /> Xác nhận mật khẩu mới
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotStep('request');
                      setForgotError('');
                      setForgotSuccess('');
                    }}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1 font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-2/3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Success State */}
            {forgotStep === 'success' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">Đổi mật khẩu thành công!</h4>
                  <p className="text-slate-500 text-xs">
                    Mật khẩu của bạn đã được cập nhật thành công. Bạn có thể đăng nhập ngay bây giờ.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseForgotModal}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Đăng nhập ngay
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold">Đang tải...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
