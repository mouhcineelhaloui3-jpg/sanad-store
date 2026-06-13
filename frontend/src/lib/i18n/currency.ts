import { LOCALE_BCP47, type Locale } from "./localized";

export type CurrencyCode = "MAD" | "EUR" | "USD" | "GBP";

/** Plan prices are stored in MAD; convert for display. */
const RATES_FROM_MAD: Record<CurrencyCode, number> = {
  MAD: 1,
  EUR: 0.092,
  USD: 0.099,
  GBP: 0.078
};

/** Moroccan language → dirham. English → US dollars. */
export function currencyForLocale(locale: Locale): CurrencyCode {
  return locale === "en" ? "USD" : "MAD";
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
  const localeTag = currency === "MAD" ? "ar-MA" : LOCALE_BCP47[locale];

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
