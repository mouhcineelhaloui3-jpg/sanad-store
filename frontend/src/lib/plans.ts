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
    name: {
      ar: "باقة 3 أشهر",
      en: "3 Months Plan",
      de: "3-Monats-Abo",
      es: "Plan 3 meses",
      it: "Piano 3 mesi"
    },
    duration: {
      ar: "3 أشهر",
      en: "3 months",
      de: "3 Monate",
      es: "3 meses",
      it: "3 mesi"
    },
    price: 150,
    currency: "MAD",
    badge: null,
    features: [
      { ar: "جميع القنوات", en: "All channels", de: "Alle Sender", es: "Todos los canales", it: "Tutti i canali" },
      { ar: "جميع الأفلام", en: "All movies", de: "Alle Filme", es: "Todas las películas", it: "Tutti i film" },
      { ar: "جميع المسلسلات", en: "All series", de: "Alle Serien", es: "Todas las series", it: "Tutte le serie" },
      { ar: "دعم تقني", en: "Technical support", de: "Technischer Support", es: "Soporte técnico", it: "Supporto tecnico" }
    ],
    highlighted: false
  },
  {
    slug: "plan-6-months",
    name: {
      ar: "باقة 6 أشهر",
      en: "6 Months Plan",
      de: "6-Monats-Abo",
      es: "Plan 6 meses",
      it: "Piano 6 mesi"
    },
    duration: {
      ar: "6 أشهر",
      en: "6 months",
      de: "6 Monate",
      es: "6 meses",
      it: "6 mesi"
    },
    price: 250,
    currency: "MAD",
    badge: {
      ar: "الأكثر طلباً 🔥",
      en: "Most Popular 🔥",
      de: "Beliebteste 🔥",
      es: "Más popular 🔥",
      it: "Più richiesto 🔥"
    },
    features: [
      { ar: "جميع القنوات", en: "All channels", de: "Alle Sender", es: "Todos los canales", it: "Tutti i canali" },
      { ar: "جميع الأفلام", en: "All movies", de: "Alle Filme", es: "Todas las películas", it: "Tutti i film" },
      { ar: "جميع المسلسلات", en: "All series", de: "Alle Serien", es: "Todas las series", it: "Tutte le serie" },
      { ar: "دعم تقني", en: "Technical support", de: "Technischer Support", es: "Soporte técnico", it: "Supporto tecnico" }
    ],
    highlighted: true
  },
  {
    slug: "plan-12-months",
    name: {
      ar: "باقة سنة كاملة",
      en: "Full Year Plan",
      de: "Jahres-Abo",
      es: "Plan anual",
      it: "Piano annuale"
    },
    duration: {
      ar: "12 شهر",
      en: "12 months",
      de: "12 Monate",
      es: "12 meses",
      it: "12 mesi"
    },
    price: 400,
    currency: "MAD",
    badge: {
      ar: "أفضل قيمة 💎",
      en: "Best Value 💎",
      de: "Bestes Angebot 💎",
      es: "Mejor valor 💎",
      it: "Miglior valore 💎"
    },
    features: [
      { ar: "جميع القنوات", en: "All channels", de: "Alle Sender", es: "Todos los canales", it: "Tutti i canali" },
      { ar: "جميع الأفلام", en: "All movies", de: "Alle Filme", es: "Todas las películas", it: "Tutti i film" },
      { ar: "جميع المسلسلات", en: "All series", de: "Alle Serien", es: "Todas las series", it: "Tutte le serie" },
      { ar: "دعم تقني أولوية", en: "Priority support", de: "Prioritäts-Support", es: "Soporte prioritario", it: "Supporto prioritario" }
    ],
    highlighted: false
  }
];
