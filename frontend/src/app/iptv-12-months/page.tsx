import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-12-months" as const,
  path: "/iptv-12-months",
  title: "اشتراك IPTV 12 شهر — باقة مميز | +115,000 قناة SANAD",
  description:
    "باقة IPTV مميز 12 شهر — أفضل قيمة. 115,000+ قناة، 120,000+ VOD، رياضة 4K، دعم أولوية 24/7، ضمان 30 يوم.",
  subtitle: "وفّر أكثر مع الاشتراك السنوي — FIFA 2026™ وكل البطولات طوال السنة.",
  bullets: [
    "115,000+ قناة — 120,000+ VOD",
    "أفضل قيمة مقابل السعر — سنة كاملة",
    "دعم واتساب أولوية 24/7",
    "Replay TV 7 أيام — جودة 4K/8K",
    "FIFA World Cup 2026™ وكل البطولات"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv12MonthsPage() {
  return <PlanLandingPage config={config} />;
}
