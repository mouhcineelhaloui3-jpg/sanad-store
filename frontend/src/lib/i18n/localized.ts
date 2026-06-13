export type Locale = "ar" | "en";

/** Moroccan Darija vs Modern Standard Arabic for other Arab countries. */
export type ArabicVariant = "ma" | "standard";

/** Visitor market — drives currency and which languages are offered. */
export type Market = "morocco" | "arab" | "international";

export type LocalizedText = {
  ar: string;
  en: string;
  /** Modern Standard Arabic — used outside Morocco when locale is ar. */
  arStandard?: string;
};

export const ALL_LOCALES: Locale[] = ["ar", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  ar: "العربية",
  en: "English"
};

export const LOCALE_BCP47: Record<Locale, string> = {
  ar: "ar",
  en: "en-US"
};

let activeArabicVariant: ArabicVariant = "standard";

export function setArabicVariant(variant: ArabicVariant): void {
  activeArabicVariant = variant;
}

export function getArabicVariant(): ArabicVariant {
  return activeArabicVariant;
}

/** Languages available per market. Morocco: both; Arab world: Arabic only; rest: English only. */
export function localesForMarket(market: Market): Locale[] {
  if (market === "morocco") return ["ar", "en"];
  if (market === "arab") return ["ar"];
  return ["en"];
}

export function htmlLang(locale: Locale, arabicVariant: ArabicVariant): string {
  if (locale === "ar" && arabicVariant === "ma") return "ar-MA";
  return locale === "ar" ? "ar" : "en";
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  if (locale === "en") return text.en || text.ar;
  if (activeArabicVariant === "standard" && text.arStandard) return text.arStandard;
  return text.ar || text.en;
}

export function localizedNavLinks(
  links: { label: LocalizedText; href: string }[],
  locale: Locale
) {
  return links.map((link) => ({ label: t(link.label, locale), href: link.href }));
}
