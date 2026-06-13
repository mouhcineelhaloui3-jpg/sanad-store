"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUtmFromUrl, getSessionId } from "@/lib/analytics/utm";
import { trackClick, trackPageView } from "@/lib/analytics/track";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = () => {
      captureUtmFromUrl(new URL(window.location.href));
      getSessionId();
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(run, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 1500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const schedule = () => trackPageView(pathname);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(schedule, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(schedule, 500);
    return () => window.clearTimeout(id);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      const onClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const element = target?.closest("a, button");
        if (!element || element.closest("[data-no-track]")) return;

        const trackId = element.getAttribute("data-track");
        const text = element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80);
        const label = trackId ?? text ?? element.tagName.toLowerCase();
        const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") : null;

        trackClick(label, { href, tag: element.tagName.toLowerCase() });
      };
      document.addEventListener("click", onClick, { capture: true, passive: true });
      return () => document.removeEventListener("click", onClick, { capture: true });
    };

    let cleanup: (() => void) | undefined;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => {
        cleanup = attach();
      }, { timeout: 4000 });
      return () => {
        window.cancelIdleCallback(id);
        cleanup?.();
      };
    }
    const id = window.setTimeout(() => {
      cleanup = attach();
    }, 2000);
    return () => {
      window.clearTimeout(id);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
