"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const { items, open } = useCartStore();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const { header } = useStoreContent();

  return (
    <header className="sticky top-0 z-40 border-b border-sand-100/80 bg-sand-50/90 backdrop-blur-md">
      <div className="bg-gradient-to-l from-sand-900 to-sand-950 px-4 py-2 text-center text-sm font-semibold text-white">
        <span className="inline-flex items-center gap-2">
          <span className="hidden sm:inline">🇲🇦</span>
          {header.promoBar}
        </span>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-sand-900 md:flex">
          {header.navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-sand-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            className="relative rounded-full border border-sand-100 bg-white p-3 text-sand-950 shadow-sm transition hover:shadow-md"
            aria-label="فتح السلة"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sage-700 text-[10px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>
          <MobileNav cartCount={count} />
        </div>
      </div>
    </header>
  );
}
