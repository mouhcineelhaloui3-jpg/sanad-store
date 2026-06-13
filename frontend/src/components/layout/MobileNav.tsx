"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher, useNavLinks, usePromoBar, useSubscribeLabel } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const links = useNavLinks();
  const promoBar = usePromoBar();
  const subscribeLabel = useSubscribeLabel();
  const openOrder = useIptvModalStore((s) => s.openOrder);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 bg-white/5 p-3 text-white md:hidden"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="إغلاق القائمة"
          />
          <aside className="mobile-nav-panel absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 bg-dark-50 p-5 shadow-glow">
            <h2 id="mobile-nav-title" className="sr-only">
              القائمة
            </h2>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="إغلاق">
                <X className="h-5 w-5 text-white" aria-hidden="true" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label="روابط التنقل">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-bold text-white transition hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openOrder();
                }}
                className="btn-neon w-full"
              >
                {subscribeLabel}
              </button>
            </div>
            <p className="mt-auto rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-3 text-center text-xs font-bold text-neon-cyan">
              {promoBar}
            </p>
          </aside>
        </div>
      ) : null}
    </>
  );
}
