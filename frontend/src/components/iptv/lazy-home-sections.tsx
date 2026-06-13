"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

function SectionFallback() {
  return <div className="iptv-section-spacing min-h-[8rem] animate-pulse bg-white/[0.02]" aria-hidden />;
}

function lazyNamed<P extends object>(
  importFn: () => Promise<Record<string, ComponentType<P>>>,
  name: string,
  options?: { ssr?: boolean }
) {
  return dynamic(() => importFn().then((mod) => ({ default: mod[name] })), {
    loading: SectionFallback,
    ssr: options?.ssr ?? true
  });
}

/** Below-fold sections use ssr:false to defer client JS and reduce TBT. */
export const LazyIptvLiveTicker = lazyNamed(
  () => import("@/components/iptv/IptvLiveTicker"),
  "IptvLiveTicker",
  { ssr: false }
);

export const LazyIptvSportsShowcase = lazyNamed(
  () => import("@/components/iptv/IptvSportsShowcase"),
  "IptvSportsShowcase",
  { ssr: false }
);

export const LazyIptvMoviesShowcase = lazyNamed(
  () => import("@/components/iptv/IptvMoviesShowcase"),
  "IptvMoviesShowcase",
  { ssr: false }
);

export const LazyIptvFeatures = lazyNamed(
  () => import("@/components/iptv/IptvFeatures"),
  "IptvFeatures",
  { ssr: false }
);

export const LazyIptvPlans = lazyNamed(
  () => import("@/components/iptv/IptvPlans"),
  "IptvPlans",
  { ssr: true }
);

export const LazyIptvHowItWorks = lazyNamed(
  () => import("@/components/iptv/IptvHowItWorks"),
  "IptvHowItWorks",
  { ssr: false }
);

export const LazyIptvDeviceGrid = lazyNamed(
  () => import("@/components/iptv/IptvDeviceGrid"),
  "IptvDeviceGrid",
  { ssr: false }
);

export const LazyIptvTrial = lazyNamed(
  () => import("@/components/iptv/IptvTrial"),
  "IptvTrial",
  { ssr: false }
);

export const LazyIptvTestimonials = lazyNamed(
  () => import("@/components/iptv/IptvTestimonials"),
  "IptvTestimonials",
  { ssr: false }
);

export const LazyIptvStats = lazyNamed(
  () => import("@/components/iptv/IptvStats"),
  "IptvStats",
  { ssr: true }
);

export const LazyIptvFaq = lazyNamed(
  () => import("@/components/iptv/IptvFaq"),
  "IptvFaq",
  { ssr: true }
);

export const LazyIptvContact = lazyNamed(
  () => import("@/components/iptv/IptvContact"),
  "IptvContact",
  { ssr: false }
);

function HeroFallback() {
  return (
    <section className="iptv-hero-spacing px-4" aria-hidden>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div className="min-h-[420px] animate-pulse rounded-3xl bg-white/[0.03]" />
        <div className="tv-frame mx-auto aspect-video w-full max-w-md animate-pulse rounded-xl bg-white/5" />
      </div>
    </section>
  );
}

export const LazyIptvHeroDeferred = dynamic(
  () => import("@/components/iptv/IptvHeroClient").then((m) => ({ default: m.IptvHeroClient })),
  { loading: HeroFallback, ssr: true }
);
