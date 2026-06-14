import type { LocalizedText } from "@/lib/i18n/localized";

export type Plan = {
  slug: string;
  name: LocalizedText;
  duration: LocalizedText;
  price: number;
  currency: string;
  badge: LocalizedText | null;
  features: LocalizedText[];
  highlighted: boolean;
};

const sharedFeatures: LocalizedText[] = [
  { ar: "115,000+ قناة مباشرة", en: "115,000+ live channels" },
  { ar: "120,000+ أفلام ومسلسلات VOD", en: "120,000+ movies & series VOD" },
  { ar: "جودة IPTV HD و 4K", en: "HD & 4K IPTV quality" },
  { ar: "متوافق IPTV Smarters و TiviMate", en: "IPTV Smarters & TiviMate compatible" },
  { ar: "تحديثات القنوات تلقائية", en: "Automatic channel updates" },
  { ar: "Replay TV مدمج", en: "Replay TV included" },
  { ar: "حماية من التقطيع", en: "Advanced anti-buffering" },
  { ar: "تفعيل خلال 5 دقائق", en: "Activation within 5 minutes" }
];

export const defaultPlans: Plan[] = [
  {
    slug: "plan-3-months",
    name: { ar: "بداية", en: "Starter" },
    duration: { ar: "اشتراك IPTV 3 أشهر", en: "3-month IPTV subscription" },
    price: 80,
    currency: "MAD",
    badge: null,
    features: [...sharedFeatures, { ar: "دعم واتساب", en: "WhatsApp support" }, { ar: "🛡️ ضمان استرداد 30 يوم", en: "🛡️ 30-day money-back guarantee" }],
    highlighted: false
  },
  {
    slug: "plan-6-months",
    name: { ar: "راحة", en: "Confort" },
    duration: { ar: "اشتراك IPTV 6 أشهر", en: "6-month IPTV subscription" },
    price: 140,
    currency: "MAD",
    badge: { ar: "الأكثر طلباً 🔥", en: "Most Popular 🔥" },
    features: [
      ...sharedFeatures.slice(0, 2),
      { ar: "جودة IPTV HD و 4K و 8K", en: "HD, 4K & 8K IPTV quality" },
      ...sharedFeatures.slice(3, 6),
      { ar: "Replay TV 7 أيام", en: "7-day Replay TV" },
      ...sharedFeatures.slice(7),
      { ar: "دعم واتساب 24/7", en: "24/7 WhatsApp support" },
      { ar: "🛡️ ضمان استرداد 30 يوم", en: "🛡️ 30-day money-back guarantee" }
    ],
    highlighted: true
  },
  {
    slug: "plan-12-months",
    name: { ar: "مميز", en: "Premium" },
    duration: { ar: "اشتراك IPTV 12 شهر", en: "12-month IPTV subscription" },
    price: 240,
    currency: "MAD",
    badge: { ar: "أفضل قيمة 💎", en: "Best Value 💎" },
    features: [
      ...sharedFeatures.slice(0, 2),
      { ar: "أفضل جودة IPTV 4K و 8K", en: "Best 4K & 8K IPTV quality" },
      ...sharedFeatures.slice(3, 6),
      { ar: "Replay TV 7 أيام", en: "7-day Replay TV" },
      ...sharedFeatures.slice(7),
      { ar: "دعم واتساب أولوية 24/7", en: "Priority 24/7 WhatsApp support" },
      { ar: "🛡️ ضمان استرداد 30 يوم", en: "🛡️ 30-day money-back guarantee" }
    ],
    highlighted: false
  },
  {
    slug: "plan-2-screens",
    name: { ar: "باقة جهازين", en: "Pack 2 Screens" },
    duration: { ar: "اشتراك IPTV 12 شهر — جهازين", en: "12-month IPTV — 2 devices" },
    price: 400,
    currency: "MAD",
    badge: { ar: "جهازين 📺📺", en: "2 Devices 📺📺" },
    features: [
      ...sharedFeatures.slice(0, 2),
      { ar: "أفضل جودة IPTV 4K و 8K ultra HD", en: "Best 4K & 8K ultra HD IPTV" },
      { ar: "2 أكواد IPTV — جهازين في نفس الوقت", en: "2 IPTV codes — 2 screens at once" },
      ...sharedFeatures.slice(3, 6),
      { ar: "Replay TV 7 أيام", en: "7-day Replay TV" },
      ...sharedFeatures.slice(7),
      { ar: "دعم واتساب VIP 24/7", en: "VIP 24/7 WhatsApp support" },
      { ar: "🛡️ ضمان استرداد 30 يوم", en: "🛡️ 30-day money-back guarantee" }
    ],
    highlighted: false
  }
];
