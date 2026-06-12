"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { DynamicBackground } from "@/components/iptv/DynamicBackground";
import { IptvStickyCta } from "@/components/iptv/IptvStickyCta";
import { OrderModal } from "@/components/iptv/OrderModal";
import { PremiumParticles } from "@/components/iptv/PremiumParticles";
import { TrialModal } from "@/components/iptv/TrialModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleSync } from "@/components/layout/LocaleSync";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

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
    <>
      <LocaleSync />
      <DynamicBackground />
      <PremiumParticles />
      <Header />
      <main className="relative">{children}</main>
      <Footer />
      <OrderModal />
      <TrialModal />
      <IptvStickyCta />
      <WhatsAppButton />
      <Toaster richColors position="top-center" theme="dark" />
    </>
  );
}
