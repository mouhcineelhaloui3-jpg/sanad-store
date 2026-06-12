"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUtmFromUrl, getSessionId } from "@/lib/analytics/utm";
import { trackClick, trackPageView } from "@/lib/analytics/track";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmFromUrl(new URL(window.location.href));
    getSessionId();
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    trackPageView(pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest("a, button");
      if (!element || element.closest("[data-no-track]")) return;

      const trackId = element.getAttribute("data-track");
      const text = element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80);
      const label = trackId ?? text ?? element.tagName.toLowerCase();
      const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") : null;

      trackClick(label, {
        href,
        tag: element.tagName.toLowerCase()
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
