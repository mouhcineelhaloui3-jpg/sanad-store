"use client";

import { getSessionId, getStoredUtm } from "./utm";
import type { AnalyticsEventName } from "./types";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; page: () => void };
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

type TrackOptions = {
  properties?: Record<string, string | number | boolean | null>;
  value?: number;
  currency?: string;
};

let lastClickAt = 0;

function firePixels(name: AnalyticsEventName, options: TrackOptions = {}) {
  const props = options.properties ?? {};

  try {
    window.gtag?.("event", name, {
      ...props,
      value: options.value,
      currency: options.currency ?? "MAD"
    });
  } catch {
    // no-op
  }

  try {
    if (name === "page_view") {
      window.fbq?.("track", "PageView");
    } else if (name === "initiate_checkout" || name === "modal_open") {
      window.fbq?.("track", "InitiateCheckout", props);
    } else if (name === "lead" || name === "trial_submit") {
      window.fbq?.("track", "Lead", props);
    } else if (name === "click") {
      window.fbq?.("trackCustom", "Click", props);
    }
  } catch {
    // no-op
  }

  try {
    if (name === "page_view") {
      window.ttq?.page();
    } else {
      window.ttq?.track(name, props);
    }
  } catch {
    // no-op
  }

  try {
    window.plausible?.(name, { props: props as Record<string, string | number> });
  } catch {
    // no-op
  }
}

export function trackEvent(name: AnalyticsEventName, options: TrackOptions = {}) {
  if (typeof window === "undefined") return;

  const utm = getStoredUtm();
  const payload = {
    name,
    path: window.location.pathname,
    properties: options.properties ?? {},
    sessionId: getSessionId(),
    utm
  };

  firePixels(name, options);

  void fetch("/api/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => undefined);
}

export function trackPageView(path: string) {
  trackEvent("page_view", { properties: { path } });
}

export function trackClick(label: string, extra?: Record<string, string | number | boolean | null>) {
  const now = Date.now();
  if (now - lastClickAt < 400) return;
  lastClickAt = now;

  trackEvent("click", {
    properties: {
      label,
      ...extra
    }
  });
}

export function trackModalOpen(modal: "order" | "trial", planSlug?: string | null) {
  trackEvent("modal_open", {
    properties: {
      modal,
      planSlug: planSlug ?? null
    }
  });
  trackEvent("initiate_checkout", {
    properties: {
      modal,
      planSlug: planSlug ?? null
    }
  });
}

export function trackLead(planSlug: string, device: string) {
  trackEvent("lead", {
    properties: { planSlug, device },
    value: undefined
  });
}

export function trackTrialSubmit(device: string) {
  trackEvent("trial_submit", { properties: { device } });
}

export function trackWhatsAppClick(source: string) {
  trackEvent("whatsapp_click", { properties: { source } });
}

export function getTrackingPayload() {
  const utm = getStoredUtm();
  return {
    sessionId: getSessionId(),
    utm_source: utm?.utm_source ?? null,
    utm_medium: utm?.utm_medium ?? null,
    utm_campaign: utm?.utm_campaign ?? null,
    utm_content: utm?.utm_content ?? null,
    utm_term: utm?.utm_term ?? null,
    fbclid: utm?.fbclid ?? null,
    ttclid: utm?.ttclid ?? null
  };
}
