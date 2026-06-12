export type Locale = "ar" | "en";

export type LocalizedText = {
  ar: string;
  en: string;
};

export function t(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale] || text.ar;
}

export function localizedNavLinks(
  links: { label: LocalizedText; href: string }[],
  locale: Locale
) {
  return links.map((link) => ({ label: t(link.label, locale), href: link.href }));
}
