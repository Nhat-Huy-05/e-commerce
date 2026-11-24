"use client";

import { useLanguage } from "@/lib/i18n/store";
import { CreditCard, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import React from "react";

export function HomePerks() {
  const { t } = useLanguage();

  const perks = [
    {
      icon: Truck,
      title: t("home.perk1Title"),
      desc: t("home.perk1Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("home.perk2Title"),
      desc: t("home.perk2Desc"),
    },
    {
      icon: RefreshCw,
      title: t("home.perk3Title"),
      desc: t("home.perk3Desc"),
    },
    {
      icon: CreditCard,
      title: t("home.perk4Title"),
      desc: t("home.perk4Desc"),
    },
  ];

  return (
    <section className="bg-surface-container-lowest p-6 md:p-8 mb-10 border border-surface-container rounded-sm shadow-2xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-surface-container">
        {perks.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                index > 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              <div className="w-10 h-10 bg-surface-container flex items-center justify-center shrink-0 text-secondary rounded-sm">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-title-md text-on-surface text-sm sm:text-base font-semibold">
                  {item.title}
                </h4>
                <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm mt-0.5 leading-relaxed">
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
