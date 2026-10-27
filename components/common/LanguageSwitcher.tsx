'use client';

import { useLanguage } from '@/lib/i18n/store';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage, isMounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-16 h-8 rounded-lg bg-slate-100 animate-pulse hidden sm:block" />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
        aria-label="Chọn ngôn ngữ"
        title="Chuyển đổi ngôn ngữ / Switch language"
      >
        <span className="text-sm leading-none">{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
        <span className="uppercase font-bold tracking-wider">{language}</span>
        <Globe className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={() => {
              setLanguage('vi');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-left transition-colors ${
              language === 'vi'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="text-base leading-none">🇻🇳</span>
            <span>Tiếng Việt</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLanguage('en');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-left transition-colors ${
              language === 'en'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="text-base leading-none">🇬🇧</span>
            <span>English</span>
          </button>
        </div>
      )}
    </div>
  );
}
