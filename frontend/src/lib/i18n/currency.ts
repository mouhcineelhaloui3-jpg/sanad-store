import type { Locale } from "./localized";

export type CurrencyCode = "MAD" | "EUR" | "USD" | "GBP";

/** Approximate rates: 1 MAD → foreign currency */
const RATES_FROM_MAD: Record<CurrencyCode, number> = {
  MAD: 1,
  EUR: 0.092,
  USD: 0.099,
  GBP: 0.078
};

export const LOCALE_CURRENCY: Record<Locale, CurrencyCode> = {
  ar: "MAD",
  en: "MAD",
  de: "MAD",
  es: "MAD",
  it: "MAD"
};

export function currencyForLocale(locale: Locale): CurrencyCode {
  return LOCALE_CURRENCY[locale];
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
  const localeTag =
    locale === "ar" ? "ar-MA" : locale === "de" ? "de-DE" : locale === "es" ? "es-ES" : locale === "it" ? "it-IT" : "en-US";

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
