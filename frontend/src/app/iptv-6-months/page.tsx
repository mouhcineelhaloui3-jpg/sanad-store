import type { Metadata } from "next";
import { PlanLandingPage, buildPlanLandingMetadata } from "@/components/seo/PlanLandingPage";

const config = {
  slug: "plan-6-months" as const,
  path: "/iptv-6-months",
  title: "اشتراك IPTV 6 أشهر — باقة راحة | +115,000 قناة SANAD",
  description:
    "باقة IPTV راحة 6 أشهر — الأكثر طلباً. 115,000+ قناة، 120,000+ VOD، رياضة 4K/8K، دعم واتساب 24/7.",
  subtitle: "توازن مثالي — 6 أشهر بث مستقر 99.9% وReplay TV 7 أيام.",
  bullets: [
    "115,000+ قناة + 120,000+ VOD",
    "Champions League، La Liga، Botola Pro، beIN",
    "جودة HD / FHD / 4K / 8K",
    "Replay TV 7 أيام — حماية من التقطيع",
    "دعم واتساب 24/7 — تفعيل 5 دقائق"
  ]
};

export const metadata: Metadata = buildPlanLandingMetadata(config);

export default function Iptv6MonthsPage() {
  return <PlanLandingPage config={config} />;
}
