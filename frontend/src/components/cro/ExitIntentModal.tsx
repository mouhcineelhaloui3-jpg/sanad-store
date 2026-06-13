"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { useIptvModalStore } from "@/store/iptvModalStore";
import {
  PROMO_ARM_DELAY_MS,
  canShowExitModal,
  isPromoBlocked,
  markPromoDismissed,
  markPromoInteracted,
  markPromoShown
} from "@/lib/cro/promo-storage";

export function ExitIntentModal() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);
  const openTrial = useIptvModalStore((s) => s.openTrial);

  const dismiss = useCallback(() => {
    setVisible(false);
    markPromoDismissed();
  }, []);

  const onCta = useCallback(() => {
    setVisible(false);
    markPromoInteracted();
    openTrial();
  }, [openTrial]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (isPromoBlocked() || !canShowExitModal()) return;

    const armTimer = window.setTimeout(() => setArmed(true), PROMO_ARM_DELAY_MS);

    return () => window.clearTimeout(armTimer);
  }, [pathname]);

  useEffect(() => {
    if (!armed || visible) return;

    const onExitIntent = (event: MouseEvent) => {
      if (event.clientY > 0) return;
      if (event.relatedTarget !== null) return;
      if (!canShowExitModal() || isPromoBlocked()) return;

      markPromoShown();
      setVisible(true);
    };

    document.documentElement.addEventListener("mouseleave", onExitIntent);
    return () => document.documentElement.removeEventListener("mouseleave", onExitIntent);
  }, [armed, visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm promo-overlay-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
    >
      <div className="relative max-w-md rounded-3xl border border-neon-gold/30 bg-dark p-8 text-center shadow-glow-gold promo-modal-in">
        <button
          type="button"
          onClick={dismiss}
          className="absolute left-4 top-4 rounded-lg p-2 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="text-sm font-bold text-neon-gold">عرض محدود</p>
        <h2 id="exit-title" className="mt-2 text-2xl font-black text-white">
          جرّب SANAD IPTV مجاناً قبل المغادرة
        </h2>
        <p className="mt-3 text-sm text-white/70">+100K قناة • رياضة 4K • تفعيل فوري</p>
        <button type="button" onClick={onCta} className="btn-gold mt-6 w-full">
          <MessageCircle className="inline h-5 w-5" /> ابدأ التجربة المجانية
        </button>
        <button type="button" onClick={dismiss} className="mt-3 text-xs text-white/50 underline hover:text-white/80">
          لا شكراً
        </button>
      </div>
    </div>
  );
}
