"use client";

import Link from "next/link";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { LanguageSwitcher, useNavLinks, usePromoBar, useSubscribeLabel } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteSearchDialog } from "@/components/search/SiteSearchDialog";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function Header() {
  const navLinks = useNavLinks();
  const promoBar = usePromoBar();
  const subscribeLabel = useSubscribeLabel();
  const openOrder = useIptvModalStore((s) => s.openOrder);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/5 bg-dark md:bg-dark/80 md:backdrop-blur-xl">
      <div className="site-promo-bar bg-gradient-to-l from-neon-cyan/20 to-neon-green/20 px-4 py-2 text-center text-sm font-semibold text-white">
        {promoBar}
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Logo />
        <nav className="site-nav hidden items-center gap-6 text-sm font-semibold text-white/90 md:flex" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-neon-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SiteSearchDialog />
          <LanguageSwitcher />
          <button type="button" onClick={() => openOrder()} className="btn-neon hidden px-5 py-2.5 text-xs sm:inline-flex">
            {subscribeLabel}
          </button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
