import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-2-screens" as const,
  path: "/iptv-2-screens",
  title: "باقة IPTV جهازين — Pack 2 Codes | SANAD IPTV",
  description:
    "باقة IPTV 12 شهر لجهازين — 2 أكواد، 115,000+ قناة، 120,000+ VOD، 4K/8K، دعم VIP 24/7، ضمان 30 يوم.",
  subtitle: "Smart TV + Android أو أي جهازين — نفس الوقت، نفس الجودة.",
  bullets: [
    "2 أكواد IPTV — تلفاز + هاتف أو 2 تلفزات",
    "115,000+ قناة — 120,000+ VOD",
    "4K/8K — Replay TV 7 أيام",
    "دعم واتساب VIP 24/7",
    "🛡️ ضمان استرداد 30 يوم"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv2ScreensPage() {
  return <PlanLandingPage config={config} />;
}
