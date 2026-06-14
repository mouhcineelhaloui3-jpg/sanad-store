"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LazySiteModals } from "@/components/layout/LazySiteModals";
import { LocaleSync } from "@/components/layout/LocaleSync";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { useThemeStore } from "@/store/themeStore";
import { MotionShell } from "@/components/motion/MotionShell";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const DynamicBackground = dynamic(
  () => import("@/components/iptv/DynamicBackground").then((m) => m.DynamicBackground),
  { ssr: false }
);

const DeferredSiteEffects = dynamic(
  () => import("@/components/layout/DeferredSiteEffects").then((m) => m.DeferredSiteEffects),
  { ssr: false }
);

const IptvStickyCta = dynamic(
  () => import("@/components/iptv/IptvStickyCta").then((m) => m.IptvStickyCta),
  { ssr: false }
);

const UrgencyBanner = dynamic(
  () => import("@/components/cro/UrgencyBanner").then((m) => m.UrgencyBanner),
  { ssr: false }
);

const CroEffects = dynamic(
  () => import("@/components/cro/CroEffects").then((m) => m.CroEffects),
  { ssr: false }
);

function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <>
      <ThemeSync />
      <LocaleSync />
      <DynamicBackground />
      <DeferredSiteEffects />
      <Header />
      <UrgencyBanner />
      <main id="main-content" className="relative">
        {children}
      </main>
      <Footer />
      <LazySiteModals />
      <IptvStickyCta />
      <WhatsAppButton />
      <CroEffects />
      <Toaster richColors position="top-center" theme={theme === "light" ? "light" : "dark"} />
    </>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isPromo = pathname.startsWith("/promo");

  if (isAdmin || isPromo) {
    return (
      <>
        {children}
        <Toaster richColors position="top-center" />
      </>
    );
  }

  return (
    <MotionShell>
      <StorefrontChrome>{children}</StorefrontChrome>
    </MotionShell>
  );
}
