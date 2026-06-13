"use client";

import { useEffect } from "react";
import { htmlLang, isRtl, setArabicVariant } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function LocaleSync() {
  const locale = useLocaleStore((s) => s.locale);
  const arabicVariant = useLocaleStore((s) => s.arabicVariant);
  const initFromBrowser = useLocaleStore((s) => s.initFromBrowser);

  useEffect(() => {
    initFromBrowser();
  }, [initFromBrowser]);

  useEffect(() => {
    setArabicVariant(arabicVariant);
  }, [arabicVariant]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = htmlLang(locale, arabicVariant);
    root.dir = isRtl(locale) ? "rtl" : "ltr";
    document.body.classList.toggle("locale-rtl", isRtl(locale));
    document.body.classList.toggle("locale-ltr", !isRtl(locale));
  }, [locale, arabicVariant]);

  return null;
}
