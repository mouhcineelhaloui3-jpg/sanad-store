export type Locale = "ar-ma" | "en";

export type LocalizedText = {
  /** Moroccan Darija copy — official site language. */
  ar: string;
  en: string;
  arStandard?: string;
};

/** Moroccan Arabic and English only. */
export const ALL_LOCALES: Locale[] = ["ar-ma", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  "ar-ma": "العربية المغربية",
  en: "English"
};

export const LOCALE_BCP47: Record<Locale, string> = {
  "ar-ma": "ar-MA",
  en: "en-US"
};

export const DEFAULT_LOCALE: Locale = "ar-ma";

export function htmlLang(locale: Locale): string {
  return LOCALE_BCP47[locale];
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar-ma";
}

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  if (locale === "en") return text.en || text.ar;
  return text.ar || text.en;
}

export function localizedNavLinks(
  links: { label: LocalizedText; href: string }[],
  locale: Locale
) {
  return links.map((link) => ({ label: t(link.label, locale), href: link.href }));
}
