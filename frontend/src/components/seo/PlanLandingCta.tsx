"use client";

import Link from "next/link";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function PlanLandingCta({ planSlug }: { planSlug?: string }) {
  const openTrial = useIptvModalStore((s) => s.openTrial);
  const openOrder = useIptvModalStore((s) => s.openOrder);

  return (
    <div className="cta-panel not-prose mt-10 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:flex-wrap">
      <button type="button" onClick={openTrial} className="btn-gold w-full sm:w-auto">
        🎁 تجربة مجانية
      </button>
      <button type="button" onClick={() => openOrder(planSlug)} className="btn-neon w-full sm:w-auto">
        🔥 اشترك دابا
      </button>
      <Link href="/pricing" className="btn-neon-outline w-full text-center sm:w-auto">
        شوف كل الباقات
      </Link>
    </div>
  );
}
