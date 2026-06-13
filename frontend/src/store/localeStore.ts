"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LOCALE, detectLocaleAndCurrency } from "@/lib/i18n/detect";
import type { CurrencyCode } from "@/lib/i18n/currency";
import { ALL_LOCALES, type Locale, type Market } from "@/lib/i18n/localized";

type LocaleState = {
  locale: Locale;
  currency: CurrencyCode;
  market: Market;
  userSet: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  initFromBrowser: () => void;
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,
      currency: "MAD",
      market: "morocco",
      userSet: false,
      setLocale: (locale) => {
        if (!ALL_LOCALES.includes(locale)) return;
        set({ locale, userSet: true });
      },
      setCurrency: (currency) => set({ currency, userSet: true }),
      initFromBrowser: () => {
        if (get().userSet) return;
        const detected = detectLocaleAndCurrency();
        set({
          locale: detected.locale,
          currency: detected.currency,
          market: detected.market
        });
      }
    }),
    { name: "sanad-iptv-locale-v7" }
  )
);
