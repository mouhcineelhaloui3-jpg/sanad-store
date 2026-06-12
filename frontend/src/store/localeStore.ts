"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n/localized";

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "ar",
      setLocale: (locale) => set({ locale }),
      toggle: () => set({ locale: get().locale === "ar" ? "en" : "ar" })
    }),
    { name: "sanad-iptv-locale" }
  )
);
