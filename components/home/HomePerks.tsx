'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/store';
import { CreditCard, ShieldCheck, Truck } from 'lucide-react';

export function HomePerks() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-200 shrink-0 shadow-xs">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{t('home.perk1Title')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
            {t('home.perk1Desc')}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-200 shrink-0 shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{t('home.perk2Title')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
            {t('home.perk2Desc')}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200 shrink-0 shadow-xs">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{t('home.perk3Title')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
            {t('home.perk3Desc')}
          </p>
        </div>
      </div>
    </section>
  );
}
