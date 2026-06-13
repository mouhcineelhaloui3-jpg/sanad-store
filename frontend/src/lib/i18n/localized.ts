export type Locale = "ar-ma" | "ar" | "en";

/** Visitor market — drives currency and which languages are offered. */
export type Market = "morocco" | "arab" | "international";

export type LocalizedText = {
  /** Moroccan Darija copy. */
  ar: string;
  en: string;
  /** Modern Standard Arabic — for `ar` locale outside Morocco. */
  arStandard?: string;
};

/** The only languages on the storefront — no European or other locales. */
export const ALL_LOCALES: Locale[] = ["ar-ma", "ar", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  "ar-ma": "الدارجة المغربية",
  ar: "العربية",
  en: "English"
};

export const LOCALE_BCP47: Record<Locale, string> = {
  "ar-ma": "ar-MA",
  ar: "ar",
  en: "en-US"
};

/** Languages shown per market. */
export function localesForMarket(market: Market): Locale[] {
  if (market === "morocco") return ["ar-ma", "ar", "en"];
  if (market === "arab") return ["ar"];
  return ["en"];
}

export function htmlLang(locale: Locale): string {
  return LOCALE_BCP47[locale];
}

export function isRtl(locale: Locale): boolean {
  return locale !== "en";
}

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  if (locale === "en") return text.en || text.ar;
  if (locale === "ar-ma") return text.ar || text.en;
  if (locale === "ar") return text.arStandard || text.ar || text.en;
  return text.en || text.ar;
}

export function localizedNavLinks(
  links: { label: LocalizedText; href: string }[],
  locale: Locale
) {
  return links.map((link) => ({ label: t(link.label, locale), href: link.href }));
}
