import { currencyForLocale, type CurrencyCode } from "./currency";
import type { Locale } from "./localized";

const SUPPORTED: Locale[] = ["ar", "en", "de", "es", "it"];

function localeFromTag(tag: string): Locale | null {
  const code = tag.toLowerCase().replace("_", "-");
  if (code.startsWith("ar")) return "ar";
  if (code.startsWith("de")) return "de";
  if (code.startsWith("es")) return "es";
  if (code.startsWith("it")) return "it";
  if (code.startsWith("en")) return "en";
  return null;
}

function currencyFromTag(tag: string): CurrencyCode | null {
  const code = tag.toLowerCase();
  if (code.includes("-ma") || code.startsWith("ar")) return "MAD";
  return null;
}

export function detectLocaleAndCurrency(): { locale: Locale; currency: CurrencyCode } {
  if (typeof window === "undefined") {
    return { locale: "ar", currency: "MAD" };
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Africa/Casablanca") {
      return { locale: "ar", currency: "MAD" };
    }
  } catch {
    /* ignore */
  }

  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of langs) {
    const locale = localeFromTag(raw);
    if (locale && SUPPORTED.includes(locale)) {
      const currency = currencyFromTag(raw) ?? currencyForLocale(locale);
      return { locale, currency };
    }
  }

  return { locale: "en", currency: "MAD" };
}
