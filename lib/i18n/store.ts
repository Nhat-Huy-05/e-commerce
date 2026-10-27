'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { en } from './dictionaries/en';
import { vi } from './dictionaries/vi';
import { Language, Translations } from './types';
import { useEffect, useState } from 'react';

const dictionaries: Record<Language, Translations> = {
  vi,
  en,
};

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'vi', // Mặc định là Tiếng Việt
      setLanguage: (lang: Language) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'vi' ? 'en' : 'vi' })),
    }),
    {
      name: 'nextjs-commerce-lang-storage',
    }
  )
);

// Helper để lấy chuỗi theo key dạng "header.home" hoặc fallback
export function getTranslation(lang: Language, path: string, fallback?: string): string {
  const dict = dictionaries[lang] || dictionaries.vi;
  const keys = path.split('.');
  let current: any = dict;

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return fallback || path;
    }
  }

  return typeof current === 'string' ? current : fallback || path;
}

// Hook tiện lợi dùng trong các component
export function useLanguage() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cập nhật thuộc tính lang của thẻ html
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentLang = mounted ? language : 'vi';
  const dictionary = dictionaries[currentLang];

  const t = (path: string, fallback?: string): string => {
    return getTranslation(currentLang, path, fallback);
  };

  return {
    language: currentLang,
    setLanguage,
    toggleLanguage,
    t,
    dictionary,
    isMounted: mounted,
  };
}
