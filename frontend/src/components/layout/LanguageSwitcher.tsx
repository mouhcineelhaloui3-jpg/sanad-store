"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { ALL_LOCALES, LOCALE_LABELS, localizedNavLinks, t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function LanguageSwitcher() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:border-neon-cyan/40 hover:bg-neon-cyan/10 lang-switcher-btn"
        aria-label="تغيير اللغة"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-neon-cyan" />
        {locale === "ar-ma" ? "MA" : locale.toUpperCase()}
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>
      {open ? (
        <div className="lang-switcher-menu absolute left-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-white/10 bg-dark-100/95 py-1 shadow-xl backdrop-blur-xl">
          {ALL_LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLocale(code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-neon-cyan/10 ${
                code === locale ? "font-black text-neon-cyan" : "text-white"
              }`}
            >
              <span>{LOCALE_LABELS[code]}</span>
              <span className="text-xs opacity-50">
                {code === "ar-ma" ? "MA" : code.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function useNavLinks() {
  const { header } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  return localizedNavLinks(header.navLinks, locale);
}

export function useSubscribeLabel() {
  const { header } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  return t(header.subscribeCtaLabel, locale);
}

export function usePromoBar() {
  const { header } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  return t(header.promoBar, locale);
}
