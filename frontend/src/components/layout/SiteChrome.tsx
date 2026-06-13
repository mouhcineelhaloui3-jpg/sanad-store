"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { DynamicBackground } from "@/components/iptv/DynamicBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DeferredSiteEffects } from "@/components/layout/DeferredSiteEffects";
import { LazySiteModals } from "@/components/layout/LazySiteModals";
import { LocaleSync } from "@/components/layout/LocaleSync";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const IptvStickyCta = dynamic(
  () => import("@/components/iptv/IptvStickyCta").then((m) => m.IptvStickyCta),
  { ssr: false }
);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(mobile || prefersReduced);
  }, []);

  if (isAdmin) {
    return (
      <>
        {children}
        <Toaster richColors position="top-center" />
      </>
    );
  }

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
      <LocaleSync />
      <DynamicBackground />
      <DeferredSiteEffects />
      <Header />
      <main className="relative">{children}</main>
      <Footer />
      <LazySiteModals />
      <IptvStickyCta />
      <WhatsAppButton />
      <Toaster richColors position="top-center" theme="dark" />
    </MotionConfig>
  );
}
