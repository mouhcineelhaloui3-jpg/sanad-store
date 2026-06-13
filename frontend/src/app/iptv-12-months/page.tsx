import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-12-months" as const,
  path: "/iptv-12-months",
  title: "اشتراك IPTV سنة كاملة",
  description: "باقة IPTV 12 شهر — أفضل قيمة. قنوات، أفلام، رياضة 4K طوال السنة.",
  subtitle: "وفّر أكثر مع الاشتراك السنوي — أفضل قيمة.",
  bullets: [
    "سنة كاملة بث بدون انقطاع",
    "أفضل قيمة مقابل السعر",
    "دعم تقني أولوية",
    "FIFA World Cup 2026™ وكل البطولات"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv12MonthsPage() {
  return <PlanLandingPage config={config} />;
}
