export type Locale = "ar" | "en" | "de" | "es" | "it";

export type LocalizedText = {
  ar: string;
  en: string;
  de?: string;
  es?: string;
  it?: string;
};

export const LOCALE_LABELS: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  de: "Deutsch",
  es: "Español",
  it: "Italiano"
};

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale] || text.en || text.ar;
}

export function localizedNavLinks(
  links: { label: LocalizedText; href: string }[],
  locale: Locale
) {
  return links.map((link) => ({ label: t(link.label, locale), href: link.href }));
}
