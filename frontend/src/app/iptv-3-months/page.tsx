import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-3-months" as const,
  path: "/iptv-3-months",
  title: "اشتراك IPTV 3 أشهر",
  description: "باقة IPTV 3 أشهر — قنوات، أفلام، رياضة 4K، تفعيل فوري عبر واتساب.",
  subtitle: "أحسن بداية — 3 أشهر بث مستقر ودعم سريع.",
  bullets: [
    "جميع القنوات الرياضية والعالمية",
    "أفلام ومسلسلات محدثة يومياً",
    "تفعيل فوري عبر واتساب",
    "متوافق Smart TV، Android، iPhone"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv3MonthsPage() {
  return <PlanLandingPage config={config} />;
}
