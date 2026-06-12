"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currencyForLocale, type CurrencyCode } from "@/lib/i18n/currency";
import { detectLocaleAndCurrency } from "@/lib/i18n/detect";
import type { Locale } from "@/lib/i18n/localized";

type LocaleState = {
  locale: Locale;
  currency: CurrencyCode;
  userSet: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  initFromBrowser: () => void;
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "ar",
      currency: "MAD",
      userSet: false,
      setLocale: (locale) =>
        set({ locale, currency: currencyForLocale(locale), userSet: true }),
      setCurrency: (currency) => set({ currency, userSet: true }),
      initFromBrowser: () => {
        const state = useLocaleStore.getState();
        if (state.userSet) return;
        const detected = detectLocaleAndCurrency();
        set({ locale: detected.locale, currency: detected.currency });
      }
    }),
    { name: "sanad-iptv-locale-v2" }
  )
);
