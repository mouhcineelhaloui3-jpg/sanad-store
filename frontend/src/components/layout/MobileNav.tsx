"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher, usePromoBar } from "@/components/layout/LanguageSwitcher";
import { HeaderCtaButton } from "@/components/layout/HeaderCtaButton";
import { Logo } from "@/components/layout/Logo";
import { SiteSearchDialog } from "@/components/search/SiteSearchDialog";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { moreMenuLabel, moreNavLinks, primaryNavLinks } from "@/lib/navigation/site-nav";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const locale = useLocaleStore((s) => s.locale);
  const promoBar = usePromoBar();
  const openOrder = useIptvModalStore((s) => s.openOrder);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setMoreOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mobile-nav-trigger rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:border-neon-cyan/30 hover:bg-neon-cyan/5 md:hidden"
        aria-label={locale === "en" ? "Open menu" : "فتح القائمة"}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`mobile-nav-overlay fixed inset-0 z-50 md:hidden ${open ? "mobile-nav-overlay-open" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="mobile-nav-title"
      >
        <button
          type="button"
          className={`mobile-nav-backdrop absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
          aria-label={locale === "en" ? "Close menu" : "إغلاق القائمة"}
        />

        <aside
          className={`mobile-nav-sheet absolute inset-0 flex flex-col bg-dark/97 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Logo compact />
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-white/10 p-2.5 text-white transition hover:border-neon-cyan/30"
              aria-label={locale === "en" ? "Close" : "إغلاق"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 id="mobile-nav-title" className="sr-only">
            {locale === "en" ? "Navigation" : "القائمة"}
          </h2>

          <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label={locale === "en" ? "Mobile navigation" : "التنقل"}>
            <div className="space-y-1">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="mobile-nav-link block rounded-xl px-4 py-3.5 text-base font-bold text-white transition hover:bg-white/5 hover:text-neon-cyan"
                >
                  {t(link.label, locale)}
                </Link>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-base font-bold text-white transition hover:bg-white/5"
                aria-expanded={moreOpen}
              >
                {t(moreMenuLabel, locale)}
                <ChevronDown className={`h-4 w-4 text-neon-cyan transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`mobile-nav-accordion grid transition-all duration-300 ease-out ${
                  moreOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-0.5 border-t border-white/10 px-2 py-2">
                    {moreNavLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={close}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-neon-cyan/5"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-white">{t(item.label, locale)}</span>
                            <span className="block text-xs text-white/50">{t(item.description, locale)}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="space-y-3 border-t border-white/10 px-5 py-5">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <SiteSearchDialog />
              <LanguageSwitcher />
            </div>
            <HeaderCtaButton
              onClick={() => {
                close();
                openOrder();
              }}
              className="w-full"
            />
            <p className="rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 px-3 py-2.5 text-center text-[11px] font-semibold leading-relaxed text-neon-cyan/90">
              {promoBar}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
