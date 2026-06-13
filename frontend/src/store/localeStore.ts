"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { detectLocaleAndCurrency } from "@/lib/i18n/detect";
import { currencyForLocale, type CurrencyCode } from "@/lib/i18n/currency";
import { ALL_LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/localized";

type LocaleState = {
  locale: Locale;
  currency: CurrencyCode;
  userSet: boolean;
  setLocale: (locale: Locale) => void;
  initFromBrowser: () => void;
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,
      currency: "MAD",
      userSet: false,
      setLocale: (locale) => {
        if (!ALL_LOCALES.includes(locale)) return;
        set({ locale, currency: currencyForLocale(locale), userSet: true });
      },
      initFromBrowser: () => {
        if (get().userSet) return;
        const detected = detectLocaleAndCurrency();
        set({
          locale: detected.locale,
          currency: detected.currency
        });
      }
    }),
    { name: "sanad-iptv-locale-v8" }
  )
);
