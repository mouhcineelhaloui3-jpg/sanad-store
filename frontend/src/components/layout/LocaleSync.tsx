"use client";

import { useEffect } from "react";
import { htmlLang, isRtl } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function LocaleSync() {
  const locale = useLocaleStore((s) => s.locale);
  const initFromBrowser = useLocaleStore((s) => s.initFromBrowser);

  useEffect(() => {
    const run = () => initFromBrowser();
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 800);
    return () => window.clearTimeout(id);
  }, [initFromBrowser]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = htmlLang(locale);
    root.dir = isRtl(locale) ? "rtl" : "ltr";
    document.body.classList.toggle("locale-rtl", isRtl(locale));
    document.body.classList.toggle("locale-ltr", !isRtl(locale));
  }, [locale]);

  return null;
}
