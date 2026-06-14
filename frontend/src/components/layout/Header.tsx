"use client";

import Link from "next/link";
import { usePromoBar, useSubscribeLabel } from "@/components/layout/LanguageSwitcher";
import { HeaderCtaButton } from "@/components/layout/HeaderCtaButton";
import { Logo } from "@/components/layout/Logo";
import { NavMoreDropdown } from "@/components/layout/NavMoreDropdown";
import { SiteSearchDialog } from "@/components/search/SiteSearchDialog";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { primaryNavLinks } from "@/lib/navigation/site-nav";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function Header() {
  const locale = useLocaleStore((s) => s.locale);
  const promoBar = usePromoBar();
  const openOrder = useIptvModalStore((s) => s.openOrder);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/[0.06]">
      <div className="site-promo-bar border-b border-white/[0.04] px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-white/90">
        {promoBar}
      </div>

      <div className="site-header-bar relative">
        <div className="site-header-glass pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2.5 md:py-3">
          <Logo compact />

          <nav
            className="site-nav hidden flex-1 items-center justify-center gap-1 md:flex"
            aria-label={locale === "en" ? "Main navigation" : "التنقل الرئيسي"}
          >
            {primaryNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="site-nav-link">
                {t(link.label, locale)}
              </Link>
            ))}
            <NavMoreDropdown />
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden items-center gap-1.5 md:flex">
              <ThemeToggle />
              <SiteSearchDialog />
              <LanguageSwitcher />
            </div>
            <HeaderCtaButton onClick={() => openOrder()} className="hidden sm:inline-flex" />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
