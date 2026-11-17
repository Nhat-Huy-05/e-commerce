'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/store';
import { CreditCard, RefreshCw, ShieldCheck, Truck } from 'lucide-react';

export function HomePerks() {
  const { t } = useLanguage();

  const perks = [
    {
      icon: Truck,
      title: t('home.perk1Title'),
      desc: t('home.perk1Desc'),
    },
    {
      icon: ShieldCheck,
      title: t('home.perk2Title'),
      desc: t('home.perk2Desc'),
    },
    {
      icon: RefreshCw,
      title: t('home.perk3Title'),
      desc: t('home.perk3Desc'),
    },
    {
      icon: CreditCard,
      title: t('home.perk4Title'),
      desc: t('home.perk4Desc'),
    },
  ];

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-2xs py-4 px-5 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {perks.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3.5 ${
                index > 0 ? 'pt-4 sm:pt-0 sm:pl-4 lg:pl-6' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-800">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
