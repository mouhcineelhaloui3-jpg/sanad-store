import { t, type Locale } from "./localized";

const strings = {
  subscribeNow: { ar: "اشترك الآن", en: "Subscribe Now" },
  freeTrial: { ar: "🎁 تجربة", en: "🎁 Trial" },
  subscribe: { ar: "🔥 اشترك", en: "🔥 Subscribe" },
  channels: { ar: "قناة", en: "channels" },
  availableNow: { ar: "متاح للمشتركين", en: "Available now" },
  titles: { ar: "فيلم ومسلسل", en: "titles" },
  includedSub: { ar: "متاح مع الاشتراك", en: "Included with subscription" },
  whatsappFooter: { ar: "تواصل عبر واتساب", en: "WhatsApp" },
  quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
  policies: { ar: "السياسات", en: "Policies" },
  adminPanel: { ar: "لوحة التحكم", en: "Admin panel" },
  moviesFreshNote: {
    ar: "محتوى جديد كل يوم — أفلام ومسلسلات 2025 و 2026",
    en: "Fresh content daily — 2025 & 2026 movies and series"
  }
} as const;

export type UiStringKey = keyof typeof strings;

export function ui(key: UiStringKey, locale: Locale): string {
  return t(strings[key], locale);
}
