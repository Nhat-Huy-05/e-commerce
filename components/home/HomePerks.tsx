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
    <section className="bg-white rounded-2xl border border-slate-200 shadow-xs py-5 px-6 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {perks.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                index > 0 ? 'pt-5 sm:pt-0 sm:pl-6 lg:pl-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
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
