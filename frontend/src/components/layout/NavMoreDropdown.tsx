"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { moreMenuLabel, moreNavLinks } from "@/lib/navigation/site-nav";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function NavMoreDropdown() {
  const locale = useLocaleStore((s) => s.locale);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  const handleEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  return (
    <div className="nav-more-root relative" onMouseEnter={handleEnter} onMouseLeave={scheduleClose}>
      <button
        type="button"
        className={`nav-more-trigger flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          open ? "text-neon-cyan" : "text-white/80 hover:text-white"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {t(moreMenuLabel, locale)}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`nav-mega-panel pointer-events-none absolute start-0 top-[calc(100%+0.5rem)] z-50 w-[min(100vw-2rem,28rem)] transition-all duration-300 ease-out ${
          open ? "nav-mega-panel-open pointer-events-auto" : ""
        }`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="nav-mega-panel-inner overflow-hidden rounded-2xl border border-neon-cyan/20 bg-dark-50/80 p-2 shadow-glow backdrop-blur-2xl">
          <div className="grid gap-0.5 sm:grid-cols-2">
            {moreNavLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="nav-mega-item group flex gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-mega-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan transition-all duration-200 group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/10 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-white transition-colors group-hover:text-neon-cyan">
                      {t(item.label, locale)}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-white/50 group-hover:text-white/65">
                      {t(item.description, locale)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
