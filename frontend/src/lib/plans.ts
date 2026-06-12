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

export const defaultPlans: Plan[] = [
  {
    slug: "plan-3-months",
    name: { ar: "باقة 3 أشهر", en: "3 Months Plan" },
    duration: { ar: "3 أشهر", en: "3 months" },
    price: 150,
    currency: "MAD",
    badge: null,
    features: [
      { ar: "جميع القنوات", en: "All channels" },
      { ar: "جميع الأفلام", en: "All movies" },
      { ar: "جميع المسلسلات", en: "All series" },
      { ar: "دعم تقني", en: "Technical support" }
    ],
    highlighted: false
  },
  {
    slug: "plan-6-months",
    name: { ar: "باقة 6 أشهر", en: "6 Months Plan" },
    duration: { ar: "6 أشهر", en: "6 months" },
    price: 250,
    currency: "MAD",
    badge: { ar: "الأكثر طلباً 🔥", en: "Most Popular 🔥" },
    features: [
      { ar: "جميع القنوات", en: "All channels" },
      { ar: "جميع الأفلام", en: "All movies" },
      { ar: "جميع المسلسلات", en: "All series" },
      { ar: "دعم تقني", en: "Technical support" }
    ],
    highlighted: true
  },
  {
    slug: "plan-12-months",
    name: { ar: "باقة سنة كاملة", en: "Full Year Plan" },
    duration: { ar: "12 شهر", en: "12 months" },
    price: 400,
    currency: "MAD",
    badge: { ar: "أفضل قيمة 💎", en: "Best Value 💎" },
    features: [
      { ar: "جميع القنوات", en: "All channels" },
      { ar: "جميع الأفلام", en: "All movies" },
      { ar: "جميع المسلسلات", en: "All series" },
      { ar: "دعم تقني أولوية", en: "Priority support" }
    ],
    highlighted: false
  }
];
