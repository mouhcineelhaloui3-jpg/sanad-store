"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const { items, open } = useCartStore();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-100 bg-sand-50/95 backdrop-blur">
      <div className="bg-sand-900 px-4 py-2 text-center text-sm font-semibold text-white">
        الدفع عند الاستلام داخل المغرب • تأكيد قبل الإرسال
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-sand-900 md:flex">
          <Link href="/">الرئيسية</Link>
          <Link href="/collection">المنتجات</Link>
          <Link href="/about">من نحن</Link>
          <Link href="/contact">اتصل بنا</Link>
        </nav>
        <button
          type="button"
          onClick={open}
          className="relative rounded-full border border-sand-100 bg-white p-3 text-sand-950 shadow-sm"
          aria-label="فتح السلة"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 ? (
            <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-sage-700 text-xs font-bold text-white">
              {count}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
