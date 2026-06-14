"use client";

import { ChevronDown, Coins } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ALL_CURRENCIES, CURRENCY_LABELS, type CurrencyCode } from "@/lib/i18n/currency";
import { type Locale } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function CurrencySwitcher() {
  const locale = useLocaleStore((s) => s.locale) as Locale;
  const currency = useLocaleStore((s) => s.currency);
  const setCurrency = useLocaleStore((s) => s.setCurrency);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const label = locale === "en" ? CURRENCY_LABELS[currency].en : CURRENCY_LABELS[currency].ar;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:border-neon-cyan/40 hover:bg-neon-cyan/10 lang-switcher-btn"
        aria-label={locale === "en" ? "Change currency" : "تغيير العملة"}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Coins className="h-4 w-4 text-neon-cyan" />
        {currency}
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>
      {open ? (
        <div className="lang-switcher-menu absolute left-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-dark-100/95 py-1 shadow-xl backdrop-blur-xl">
          {ALL_CURRENCIES.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setCurrency(code as CurrencyCode);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-neon-cyan/10 ${
                code === currency ? "font-black text-neon-cyan" : "text-white"
              }`}
            >
              <span>{locale === "en" ? CURRENCY_LABELS[code].en : CURRENCY_LABELS[code].ar}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
