"use client";

import { useEffect, useState } from "react";

export function DynamicBackground() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const delay = mobile ? 2500 : 1200;
    const enable = () => setShow(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: delay });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(enable, delay);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) {
    return <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0a0a0a]" aria-hidden />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="bg-base absolute inset-0" />

      <div className="absolute inset-0 hidden md:block">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="conic-spin absolute inset-0 opacity-[0.35]" />
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="perspective-grid" />
      </div>

      <div className="grid-bg absolute inset-0 opacity-20 md:opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030308_72%)]" />
    </div>
  );
}
