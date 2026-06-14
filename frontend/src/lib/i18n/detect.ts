import { DEFAULT_LOCALE, type Locale } from "./localized";
import { DEFAULT_CURRENCY, detectCurrencyFromBrowser, type CurrencyCode } from "./currency";

export type DetectResult = {
  locale: Locale;
  currency: CurrencyCode;
};

function detectLocaleFromBrowser(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const tag = (navigator.language ?? "").toLowerCase();
  if (tag.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

/** First visit: detect language + currency from browser region (defaults to ar + MAD). */
export function detectLocaleAndCurrency(): DetectResult {
  return {
    locale: detectLocaleFromBrowser(),
    currency: detectCurrencyFromBrowser()
  };
}
