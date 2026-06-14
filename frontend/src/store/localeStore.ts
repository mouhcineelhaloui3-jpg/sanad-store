"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { detectLocaleAndCurrency } from "@/lib/i18n/detect";
import { DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/i18n/currency";
import { ALL_LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/localized";

type LocaleState = {
  locale: Locale;
  currency: CurrencyCode;
  localeUserSet: boolean;
  currencyUserSet: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  initFromBrowser: () => void;
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,
      currency: DEFAULT_CURRENCY,
      localeUserSet: false,
      currencyUserSet: false,
      setLocale: (locale) => {
        if (!ALL_LOCALES.includes(locale)) return;
        set({ locale, localeUserSet: true });
      },
      setCurrency: (currency) => {
        set({ currency, currencyUserSet: true });
      },
      initFromBrowser: () => {
        const detected = detectLocaleAndCurrency();
        const state = get();
        set({
          locale: state.localeUserSet ? state.locale : detected.locale,
          currency: state.currencyUserSet ? state.currency : detected.currency
        });
      }
    }),
    { name: "sanad-iptv-locale-v9" }
  )
);
