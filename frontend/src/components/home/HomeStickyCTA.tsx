"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function HomeStickyCTA() {
  const [visible, setVisible] = useState(false);
  const open = useCartStore((state) => state.open);
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sand-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(31,24,18,0.12)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <Link href="#products" className="btn-primary min-h-12 flex-1 text-center">
          اطلب بالدفع عند الاستلام
        </Link>
        <button
          type="button"
          onClick={open}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sand-200 bg-sand-50 text-sand-950"
          aria-label="فتح السلة"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 ? (
            <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sage-700 text-[10px] font-bold text-white">
              {count}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
