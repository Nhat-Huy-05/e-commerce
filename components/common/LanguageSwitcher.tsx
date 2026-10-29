'use client';

import { useLanguage } from '@/lib/i18n/store';
import { Check, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage, isMounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  if (!isMounted) {
    return (
      <div className="w-16 h-8 rounded-lg bg-slate-100 animate-pulse hidden sm:block" />
    );
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs cursor-pointer select-none"
        aria-label="Chọn ngôn ngữ"
        title="Chuyển đổi ngôn ngữ / Switch language"
      >
        <span className="uppercase font-bold tracking-wider">{language}</span>
        <Globe className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full pt-1.5 w-40 z-50 animate-in fade-in zoom-in-95 duration-150"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setLanguage('vi');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${language === 'vi'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">🇻🇳</span>
                <span>Tiếng Việt</span>
              </div>
              {language === 'vi' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${language === 'en'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">🇬🇧</span>
                <span>English</span>
              </div>
              {language === 'en' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
