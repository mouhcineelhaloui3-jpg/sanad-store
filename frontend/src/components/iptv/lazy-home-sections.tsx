import dynamic from "next/dynamic";

function SectionFallback() {
  return <div className="iptv-section-spacing min-h-[8rem] animate-pulse bg-white/[0.02]" aria-hidden />;
}

export const LazyIptvSportsShowcase = dynamic(
  () => import("@/components/iptv/IptvSportsShowcase").then((m) => m.IptvSportsShowcase),
  { loading: SectionFallback }
);

export const LazyIptvMoviesShowcase = dynamic(
  () => import("@/components/iptv/IptvMoviesShowcase").then((m) => m.IptvMoviesShowcase),
  { loading: SectionFallback }
);

export const LazyIptvFeatures = dynamic(
  () => import("@/components/iptv/IptvFeatures").then((m) => m.IptvFeatures),
  { loading: SectionFallback }
);

export const LazyIptvPlans = dynamic(
  () => import("@/components/iptv/IptvPlans").then((m) => m.IptvPlans),
  { loading: SectionFallback }
);

export const LazyIptvHowItWorks = dynamic(
  () => import("@/components/iptv/IptvHowItWorks").then((m) => m.IptvHowItWorks),
  { loading: SectionFallback }
);

export const LazyIptvDeviceGrid = dynamic(
  () => import("@/components/iptv/IptvDeviceGrid").then((m) => m.IptvDeviceGrid),
  { loading: SectionFallback }
);

export const LazyIptvTrial = dynamic(
  () => import("@/components/iptv/IptvTrial").then((m) => m.IptvTrial),
  { loading: SectionFallback }
);

export const LazyIptvTestimonials = dynamic(
  () => import("@/components/iptv/IptvTestimonials").then((m) => m.IptvTestimonials),
  { loading: SectionFallback }
);

export const LazyIptvStats = dynamic(
  () => import("@/components/iptv/IptvStats").then((m) => m.IptvStats),
  { loading: SectionFallback }
);

export const LazyIptvFaq = dynamic(
  () => import("@/components/iptv/IptvFaq").then((m) => m.IptvFaq),
  { loading: SectionFallback }
);

export const LazyIptvContact = dynamic(
  () => import("@/components/iptv/IptvContact").then((m) => m.IptvContact),
  { loading: SectionFallback }
);
