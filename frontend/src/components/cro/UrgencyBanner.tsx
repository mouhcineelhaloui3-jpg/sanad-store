"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Clock, X } from "lucide-react";
import {
  PROMO_BANNER_DELAY_MS,
  canShowSessionBanner,
  isPromoBlocked,
  markSessionBannerDismissed,
  markSessionBannerShown
} from "@/lib/cro/promo-storage";

export function UrgencyBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [minutes, setMinutes] = useState(47);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (isPromoBlocked() || !canShowSessionBanner()) return;

    const showTimer = window.setTimeout(() => {
      if (canShowSessionBanner() && !isPromoBlocked()) {
        markSessionBannerShown();
        setVisible(true);
      }
    }, PROMO_BANNER_DELAY_MS);

    return () => window.clearTimeout(showTimer);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => {
      setMinutes((m) => (m > 5 ? m - 1 : 47));
    }, 60_000);
    return () => window.clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="relative border-b border-neon-gold/20 bg-gradient-to-l from-neon-gold/10 to-transparent px-4 py-2 text-center text-xs font-bold text-neon-gold promo-banner-in md:text-sm">
      <Clock className="mr-1 inline h-4 w-4" aria-hidden />
      عرض التفعيل الفوري — متبقي تقريباً {minutes} دقيقة على الدعم السريع
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          markSessionBannerDismissed();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-neon-gold/80 transition hover:bg-neon-gold/10 hover:text-neon-gold"
        aria-label="إغلاق العرض"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
