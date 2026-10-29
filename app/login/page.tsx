'use client';

import { useAuth } from '@/lib/auth-store';
import { useLanguage } from '@/lib/i18n/store';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Key,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  ShoppingBag,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const setUser = useAuth((state) => state.setUser);
  const { language, t } = useLanguage();

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
        throw new Error(
          data.error ||
            (language === 'vi' ? 'Đăng nhập thất bại' : 'Login failed')
        );
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
      setErrorMsg(
        err.message ||
          (language === 'vi'
            ? 'Đã xảy ra lỗi khi đăng nhập'
            : 'An error occurred while signing in')
      );
    } finally {
      setLoading(false);
    }
  };

  // Open modal handler
  const handleOpenForgotModal = () => {
    setForgotEmail(email);
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
      setForgotError(
        language === 'vi'
          ? 'Vui lòng nhập Email của bạn'
          : 'Please enter your email address'
      );
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
        throw new Error(
          data.error ||
            (language === 'vi' ? 'Không thể gửi mã OTP' : 'Unable to send OTP')
        );
      }

      if (data.otp) {
        setDemoOtp(data.otp);
      }
      setForgotSuccess(
        data.message ||
          (language === 'vi'
            ? 'Mã OTP đã được gửi đến email!'
            : 'OTP code has been sent to your email!')
      );
      setForgotStep('verify');
    } catch (err: any) {
      setForgotError(
        err.message ||
          (language === 'vi' ? 'Đã có lỗi xảy ra' : 'An error occurred')
      );
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
      setForgotError(
        language === 'vi'
          ? 'Mã OTP phải gồm đúng 6 chữ số'
          : 'OTP must be exactly 6 digits'
      );
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setForgotError(
        language === 'vi'
          ? 'Mật khẩu mới phải có ít nhất 6 ký tự'
          : 'New password must be at least 6 characters'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError(t('auth.confirmPasswordMismatch'));
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
        throw new Error(
          data.error ||
            (language === 'vi'
              ? 'Xác thực OTP thất bại'
              : 'OTP verification failed')
        );
      }

      setForgotSuccess(
        data.message ||
          (language === 'vi'
            ? 'Đổi mật khẩu thành công!'
            : 'Password changed successfully!')
      );
      setEmail(forgotEmail);
      setPassword(newPassword);
      setForgotStep('success');
    } catch (err: any) {
      setForgotError(
        err.message ||
          (language === 'vi' ? 'Đã có lỗi xảy ra' : 'An error occurred')
      );
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
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t('auth.loginTitle')}
          </h1>
          {redirectTo ? (
            <p className="text-xs text-amber-600 font-semibold flex items-center justify-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              {t('auth.loginCartRedirect')}
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              {t('auth.loginSubtitle')}
            </p>
          )}
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {t('auth.emailOrUsername')}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailOrUsernamePlaceholder')}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-slate-400" /> {t('auth.password')}
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Quên mật khẩu ngay bên dưới dòng Mật khẩu */}
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={handleOpenForgotModal}
                className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-semibold cursor-pointer transition-colors"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? t('auth.loggingIn') : t('auth.loginSubmit')}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500">
          {t('auth.noAccountPrompt')}{' '}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            {t('auth.registerNewAccount')}
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
                <h3 className="text-base font-extrabold text-slate-900">
                  {t('auth.forgotTitle')}
                </h3>
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
                  {t('auth.forgotStep1Prompt')}
                </p>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" /> {t('auth.forgotEmailLabel')}
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder={t('auth.forgotEmailPlaceholder')}
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
                    {t('auth.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-2/3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? t('auth.forgotSendingOtp') : t('auth.forgotSendOtp')}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Enter OTP & New Password */}
            {forgotStep === 'verify' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {demoOtp && (
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 flex items-center justify-between">
                    <span className="font-semibold">{t('auth.demoOtpLabel')}</span>
                    <span className="font-mono text-sm font-bold bg-indigo-100 px-2.5 py-1 rounded-lg text-indigo-900 tracking-widest border border-indigo-200">
                      {demoOtp}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> {t('auth.otpLabel')}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('auth.otpPlaceholder')}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-center tracking-widest text-lg font-mono text-indigo-700 focus:bg-white focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" /> {t('auth.newPasswordLabel')}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={t('auth.newPasswordPlaceholder')}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title={showNewPassword ? t('auth.hidePassword') : t('auth.showPassword')}
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
                    <Lock className="w-3.5 h-3.5 text-indigo-600" /> {t('auth.confirmNewPasswordLabel')}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('auth.confirmNewPasswordPlaceholder')}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
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
                    <ArrowLeft className="w-3.5 h-3.5" /> {t('auth.back')}
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-2/3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? t('auth.resettingPassword') : t('auth.confirmResetPassword')}
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
                  <h4 className="text-lg font-bold text-slate-900">
                    {t('auth.forgotSuccessTitle')}
                  </h4>
                  <p className="text-slate-500 text-xs">
                    {t('auth.forgotSuccessDesc')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseForgotModal}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-colors cursor-pointer"
                >
                  {t('auth.signInNow')}
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
  const { language } = useLanguage();

  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold">
            {language === 'vi' ? 'Đang tải...' : 'Loading...'}
          </p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
