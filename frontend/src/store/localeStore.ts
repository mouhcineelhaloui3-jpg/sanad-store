"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { detectLocaleAndCurrency } from "@/lib/i18n/detect";
import type { CurrencyCode } from "@/lib/i18n/currency";
import {
  localesForMarket,
  setArabicVariant,
  type ArabicVariant,
  type Locale,
  type Market
} from "@/lib/i18n/localized";

type LocaleState = {
  locale: Locale;
  currency: CurrencyCode;
  arabicVariant: ArabicVariant;
  market: Market;
  userSet: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  initFromBrowser: () => void;
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "ar",
      currency: "MAD",
      arabicVariant: "ma",
      market: "morocco",
      userSet: false,
      setLocale: (locale) => {
        const { market } = get();
        const allowed = localesForMarket(market);
        if (!allowed.includes(locale)) return;
        set({ locale, userSet: true });
        setArabicVariant(get().arabicVariant);
      },
      setCurrency: (currency) => set({ currency, userSet: true }),
      initFromBrowser: () => {
        const state = get();
        if (state.userSet) {
          setArabicVariant(state.arabicVariant);
          return;
        }
        const detected = detectLocaleAndCurrency();
        setArabicVariant(detected.arabicVariant);
        set({
          locale: detected.locale,
          currency: detected.currency,
          arabicVariant: detected.arabicVariant,
          market: detected.market
        });
      }
    }),
    { name: "sanad-iptv-locale-v5" }
  )
);
