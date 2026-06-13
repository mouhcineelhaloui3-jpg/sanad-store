import { DEFAULT_LOCALE, type Locale } from "./localized";
import { currencyForLocale, type CurrencyCode } from "./currency";

export type DetectResult = {
  locale: Locale;
  currency: CurrencyCode;
};

/** First visit: Moroccan Arabic + dirham (official site language and currency). */
export function detectLocaleAndCurrency(): DetectResult {
  return {
    locale: DEFAULT_LOCALE,
    currency: currencyForLocale(DEFAULT_LOCALE)
  };
}
