"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { detectLocaleAndCurrency } from "@/lib/i18n/detect";
import type { CurrencyCode } from "@/lib/i18n/currency";
import { localesForMarket, type Locale, type Market } from "@/lib/i18n/localized";

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
      locale: "ar-ma",
      currency: "MAD",
      market: "morocco",
      userSet: false,
      setLocale: (locale) => {
        const { market } = get();
        if (!localesForMarket(market).includes(locale)) return;
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
    { name: "sanad-iptv-locale-v6" }
  )
);
