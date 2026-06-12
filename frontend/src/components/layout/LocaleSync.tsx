"use client";

import { useEffect } from "react";
import { isRtl } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function LocaleSync() {
  const locale = useLocaleStore((s) => s.locale);
  const initFromBrowser = useLocaleStore((s) => s.initFromBrowser);

  useEffect(() => {
    initFromBrowser();
  }, [initFromBrowser]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = isRtl(locale) ? "rtl" : "ltr";
    document.body.classList.toggle("locale-rtl", isRtl(locale));
    document.body.classList.toggle("locale-ltr", !isRtl(locale));
  }, [locale]);

  return null;
}
