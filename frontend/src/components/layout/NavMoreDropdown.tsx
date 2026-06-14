"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { moreMenuLabel, moreNavLinks } from "@/lib/navigation/site-nav";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

const CLOSE_DELAY_MS = 400;

export function NavMoreDropdown() {
  const locale = useLocaleStore((s) => s.locale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerInside = useRef(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      if (!pointerInside.current) setOpen(false);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const handlePointerEnter = () => {
    pointerInside.current = true;
    openMenu();
  };

  const handlePointerLeave = () => {
    pointerInside.current = false;
    scheduleClose();
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        pointerInside.current = false;
        clearCloseTimer();
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <div
      ref={rootRef}
      className="nav-more-root relative"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <button
        type="button"
        className={`nav-more-trigger flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          open ? "text-neon-cyan" : "text-white/80 hover:text-white"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          if (open) {
            pointerInside.current = false;
            clearCloseTimer();
            setOpen(false);
          } else {
            openMenu();
          }
        }}
        onFocus={openMenu}
      >
        {t(moreMenuLabel, locale)}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Hover bridge — prevents gap between trigger and panel from closing menu */}
      <div
        className={`absolute start-0 top-full z-50 w-[min(100vw-2rem,28rem)] pt-2 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
      >
        <div
          className={`nav-mega-panel transition-all duration-300 ease-out ${open ? "nav-mega-panel-open" : ""}`}
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
                    onMouseEnter={openMenu}
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
    </div>
  );
}
