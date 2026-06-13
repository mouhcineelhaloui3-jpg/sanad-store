import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-3-months" as const,
  path: "/iptv-3-months",
  title: "اشتراك IPTV 3 أشهر — باقة بداية | +115,000 قناة SANAD",
  description:
    "باقة IPTV بداية 3 أشهر — 115,000+ قناة، 120,000+ VOD، رياضة 4K، تفعيل فوري خلال 5 دقائق عبر واتساب.",
  subtitle: "أحسن بداية — 3 أشهر بث مستقر 99.9% ودعم واتساب سريع.",
  bullets: [
    "115,000+ قناة مباشرة",
    "120,000+ أفلام ومسلسلات VOD",
    "جودة HD و 4K — Replay TV",
    "تفعيل خلال 5 دقائق عبر واتساب",
    "متوافق Smart TV، Android، iPhone، Fire Stick"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv3MonthsPage() {
  return <PlanLandingPage config={config} />;
}
