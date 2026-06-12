import type { Locale } from "./localized";

const strings = {
  subscribeNow: {
    ar: "اشترك الآن",
    en: "Subscribe Now",
    de: "Jetzt abonnieren",
    es: "Suscríbete ahora",
    it: "Abbonati ora"
  },
  freeTrial: {
    ar: "🎁 تجربة",
    en: "🎁 Trial",
    de: "🎁 Test",
    es: "🎁 Prueba",
    it: "🎁 Prova"
  },
  subscribe: {
    ar: "🔥 اشترك",
    en: "🔥 Subscribe",
    de: "🔥 Abo",
    es: "🔥 Suscribir",
    it: "🔥 Abbonati"
  },
  channels: {
    ar: "قناة",
    en: "channels",
    de: "Sender",
    es: "canales",
    it: "canali"
  },
  availableNow: {
    ar: "متاح للمشتركين",
    en: "Available now",
    de: "Jetzt verfügbar",
    es: "Disponible ahora",
    it: "Disponibile ora"
  },
  titles: {
    ar: "فيلم ومسلسل",
    en: "titles",
    de: "Titel",
    es: "títulos",
    it: "titoli"
  },
  includedSub: {
    ar: "متاح مع الاشتراك",
    en: "Included with subscription",
    de: "Im Abo enthalten",
    es: "Incluido en la suscripción",
    it: "Incluso nell'abbonamento"
  },
  whatsappFooter: {
    ar: "تواصل عبر واتساب",
    en: "WhatsApp",
    de: "WhatsApp",
    es: "WhatsApp",
    it: "WhatsApp"
  },
  quickLinks: {
    ar: "روابط سريعة",
    en: "Quick Links",
    de: "Schnelllinks",
    es: "Enlaces rápidos",
    it: "Link rapidi"
  },
  policies: {
    ar: "السياسات",
    en: "Policies",
    de: "Richtlinien",
    es: "Políticas",
    it: "Politiche"
  },
  moviesFreshNote: {
    ar: "محتوى جديد كل يوم — أفلام ومسلسلات 2025 و 2026",
    en: "Fresh content daily — 2025 & 2026 movies and series",
    de: "Täglich neue Inhalte — Filme & Serien 2025 & 2026",
    es: "Contenido nuevo cada día — películas y series 2025 y 2026",
    it: "Contenuti nuovi ogni giorno — film e serie 2025 e 2026"
  }
} as const;

export type UiStringKey = keyof typeof strings;

export function ui(key: UiStringKey, locale: Locale): string {
  const entry = strings[key];
  return entry[locale] || entry.en;
}
