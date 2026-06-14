import { LOCALE_BCP47, type Locale } from "./localized";

export type CurrencyCode = "MAD" | "EUR" | "USD" | "GBP" | "CAD" | "AUD";

export const ALL_CURRENCIES: CurrencyCode[] = ["MAD", "EUR", "USD", "GBP", "CAD", "AUD"];

export const CURRENCY_LABELS: Record<CurrencyCode, { en: string; ar: string }> = {
  MAD: { en: "MAD · Dirham", ar: "د.م. · درهم" },
  EUR: { en: "EUR · Euro", ar: "EUR · يورو" },
  USD: { en: "USD · US Dollar", ar: "USD · دولار" },
  GBP: { en: "GBP · British Pound", ar: "GBP · جنيه" },
  CAD: { en: "CAD · Canadian Dollar", ar: "CAD · دولار كندي" },
  AUD: { en: "AUD · Australian Dollar", ar: "AUD · دولار أسترالي" }
};

/** Plan prices are stored in MAD; convert for display. */
const RATES_FROM_MAD: Record<CurrencyCode, number> = {
  MAD: 1,
  EUR: 0.092,
  USD: 0.099,
  GBP: 0.078,
  CAD: 0.135,
  AUD: 0.152
};

const CURRENCY_BCP47: Record<CurrencyCode, string> = {
  MAD: "ar-MA",
  EUR: "de-DE",
  USD: "en-US",
  GBP: "en-GB",
  CAD: "en-CA",
  AUD: "en-AU"
};

const EUROZONE = new Set([
  "AT",
  "BE",
  "HR",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES"
]);

/** Default storefront currency (base plan prices). */
export const DEFAULT_CURRENCY: CurrencyCode = "MAD";

export function currencyForRegion(region: string): CurrencyCode {
  const code = region.toUpperCase();
  if (code === "MA") return "MAD";
  if (code === "US") return "USD";
  if (code === "GB") return "GBP";
  if (code === "CA") return "CAD";
  if (code === "AU") return "AUD";
  if (EUROZONE.has(code)) return "EUR";
  return DEFAULT_CURRENCY;
}

export function detectCurrencyFromBrowser(): CurrencyCode {
  if (typeof navigator === "undefined") return DEFAULT_CURRENCY;

  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const region = tag.split("-")[1];
    if (region) return currencyForRegion(region);
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes("Casablanca")) return "MAD";
    if (tz.startsWith("Australia/")) return "AUD";
    if (tz.startsWith("Europe/London")) return "GBP";
    if (tz.startsWith("America/Toronto") || tz.startsWith("America/Vancouver") || tz.startsWith("America/Edmonton")) {
      return "CAD";
    }
    if (
      tz.startsWith("America/New_York") ||
      tz.startsWith("America/Chicago") ||
      tz.startsWith("America/Denver") ||
      tz.startsWith("America/Los_Angeles")
    ) {
      return "USD";
    }
    if (tz.startsWith("Europe/")) return "EUR";
  } catch {
    /* ignore */
  }

  return DEFAULT_CURRENCY;
}

/** Legacy helper — locale alone does not change currency after geo detection. */
export function currencyForLocale(_locale: Locale): CurrencyCode {
  return DEFAULT_CURRENCY;
}

export function convertFromMad(amountMad: number, currency: CurrencyCode): number {
  const value = amountMad * RATES_FROM_MAD[currency];
  return currency === "MAD" ? Math.round(value) : Math.round(value * 100) / 100;
}

export function formatPlanPrice(
  amountMad: number,
  currency: CurrencyCode,
  locale: Locale
): { primary: string; madNote: string | null } {
  const converted = convertFromMad(amountMad, currency);
  const localeTag = currency === "MAD" ? LOCALE_BCP47[locale] : CURRENCY_BCP47[currency];

  const primary = new Intl.NumberFormat(localeTag, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "MAD" ? 0 : 2
  }).format(converted);

  const madNote =
    currency === "MAD"
      ? null
      : `≈ ${new Intl.NumberFormat("ar-MA", { style: "currency", currency: "MAD", maximumFractionDigits: 0 }).format(amountMad)}`;

  return { primary, madNote };
}
