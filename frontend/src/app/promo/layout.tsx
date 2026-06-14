import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SANAD IPTV — Promo Video",
  description: "Premium cinematic SANAD IPTV promotional video.",
  robots: { index: false, follow: false }
};

export default function PromoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
