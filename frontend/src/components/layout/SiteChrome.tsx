"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { LazyMotion, domAnimation } from "@/components/motion";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LazySiteModals } from "@/components/layout/LazySiteModals";
import { LocaleSync } from "@/components/layout/LocaleSync";
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

const CroEffects = dynamic(
  () => import("@/components/cro/CroEffects").then((m) => m.CroEffects),
  { ssr: false }
);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        {children}
        <Toaster richColors position="top-center" />
      </>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <LocaleSync />
        <DynamicBackground />
        <DeferredSiteEffects />
        <Header />
        <main className="relative">{children}</main>
        <Footer />
        <LazySiteModals />
        <IptvStickyCta />
        <WhatsAppButton />
        <CroEffects />
        <Toaster richColors position="top-center" theme="dark" />
      </MotionConfig>
    </LazyMotion>
  );
}
