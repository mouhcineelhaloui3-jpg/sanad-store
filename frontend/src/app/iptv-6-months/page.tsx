import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-6-months" as const,
  path: "/iptv-6-months",
  title: "اشتراك IPTV 6 أشهر",
  description: "باقة IPTV 6 أشهر — الأكثر طلباً. قنوات، أفلام، رياضة 4K، دعم واتساب.",
  subtitle: "توازن مثالي بين السعر والمدة — الأكثر اختياراً.",
  bullets: [
    "جميع القنوات + أفلام + مسلسلات",
    "Champions League، La Liga، Botola Pro",
    "دعم تقني سريع",
    "جودة HD / FHD / 4K"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv6MonthsPage() {
  return <PlanLandingPage config={config} />;
}
