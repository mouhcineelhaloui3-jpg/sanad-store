"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PremiumParticles = dynamic(
  () => import("@/components/iptv/PremiumParticles").then((m) => m.PremiumParticles),
  { ssr: false }
);

export function DeferredSiteEffects() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduced) return;

    const enable = () => setShowParticles(true);
    const schedule =
      typeof window.requestIdleCallback === "function"
        ? () => {
            const id = window.requestIdleCallback(enable, { timeout: 2500 });
            return () => window.cancelIdleCallback(id);
          }
        : () => {
            const id = window.setTimeout(enable, 1500);
            return () => window.clearTimeout(id);
          };

    return schedule();
  }, []);

  return showParticles ? <PremiumParticles /> : null;
}
