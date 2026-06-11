"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { useCartStore } from "@/store/cartStore";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" }
];

export function MobileNav({ cartCount }: { cartCount: number }) {
  const [open, setOpen] = useState(false);
  const openCart = useCartStore((state) => state.open);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-sand-100 bg-white p-3 text-sand-950 shadow-sm md:hidden"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="إغلاق القائمة"
          />
          <aside className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-sand-50 p-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-sand-100 pb-4">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="إغلاق">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-bold text-sand-900 transition hover:bg-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-sand-900 px-5 py-4 font-black text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              السلة {cartCount > 0 ? `(${cartCount})` : ""}
            </button>
            <p className="mt-auto rounded-2xl bg-sage-100 px-4 py-3 text-center text-xs font-bold text-sage-700">
              الدفع عند الاستلام • تأكيد قبل الإرسال
            </p>
          </aside>
        </div>
      ) : null}
    </>
  );
}
