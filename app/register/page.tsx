'use client';

import { useAuth } from '@/lib/auth-store';
import { useLanguage } from '@/lib/i18n/store';
import { AtSign, Eye, EyeOff, Key, Lock, Mail, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);
  const { language, t } = useLanguage();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (username) {
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username.trim())) {
        setErrorMsg(
          language === 'vi'
            ? 'Tên người dùng chỉ gồm 3-20 ký tự chữ cái, số hoặc gạch dưới, không dấu và không cách'
            : 'Username must be 3-20 characters long and contain only letters, numbers, or underscores'
        );
        return;
      }
    }

    if (password.length < 6) {
      setErrorMsg(
        language === 'vi'
          ? 'Mật khẩu phải có ít nhất 6 ký tự'
          : 'Password must be at least 6 characters long'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(
        language === 'vi'
          ? 'Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!'
          : 'Passwords do not match. Please verify!'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim() || undefined,
          email: email.trim(),
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error ||
          (language === 'vi' ? 'Đăng ký thất bại' : 'Registration failed')
        );
      }

      setUser(data.user);
      router.push('/profile');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(
        err.message ||
        (language === 'vi'
          ? 'Đã có lỗi xảy ra khi đăng ký'
          : 'An error occurred during registration')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-4">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-xs">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t('auth.registerTitle')}
          </h1>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center animate-shake">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
          {/* Họ và Tên */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" /> {t('auth.fullName')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('auth.fullNamePlaceholder')}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Tên người dùng / Username */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-700 font-semibold flex items-center gap-1">
                <AtSign className="w-3.5 h-3.5 text-slate-400" /> {t('auth.username')}
              </label>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
              placeholder={t('auth.usernamePlaceholder')}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {t('auth.email')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-slate-400" /> {t('auth.password')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordMinLength')}
                required
                minLength={6}
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
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> {t('auth.confirmPassword')}{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                required
                minLength={6}
                className={`w-full bg-slate-50 border rounded-xl p-3 pr-10 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${confirmPassword && password !== confirmPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-500/20'
                  }`}
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
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[10px] text-red-500 font-semibold mt-1">
                ⚠️ {t('auth.confirmPasswordMismatch')}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? t('auth.registering') : t('auth.registerSubmit')}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500">
          {t('auth.hasAccountPrompt')}{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            {t('auth.loginNow')}
          </Link>
        </p>
      </div>
    </div>
  );
}
