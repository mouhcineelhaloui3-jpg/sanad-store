"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LazyMotion, domAnimation } from "@/components/motion";

/** Defer Framer bundle until idle to reduce long main-thread tasks on load. */
export function MotionShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(enable, 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return <>{children}</>;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
