import type { Locale, Market } from "./localized";
import { currencyForMarket, type CurrencyCode } from "./currency";

const ARAB_COUNTRY_CODES = new Set([
  "MA",
  "DZ",
  "TN",
  "LY",
  "EG",
  "SD",
  "SA",
  "AE",
  "QA",
  "BH",
  "KW",
  "OM",
  "YE",
  "JO",
  "LB",
  "SY",
  "IQ",
  "PS",
  "MR",
  "SO",
  "DJ",
  "KM"
]);

const ARAB_TIMEZONES = new Set([
  "Africa/Casablanca",
  "Africa/Algiers",
  "Africa/Tunis",
  "Africa/Tripoli",
  "Africa/Cairo",
  "Africa/Khartoum",
  "Asia/Riyadh",
  "Asia/Dubai",
  "Asia/Qatar",
  "Asia/Bahrain",
  "Asia/Kuwait",
  "Asia/Muscat",
  "Asia/Aden",
  "Asia/Amman",
  "Asia/Beirut",
  "Asia/Damascus",
  "Asia/Baghdad",
  "Asia/Gaza",
  "Asia/Hebron",
  "Africa/Nouakchott",
  "Africa/Mogadishu",
  "Africa/Djibouti",
  "Indian/Comoro"
]);

function regionFromTag(tag: string): string | null {
  const normalized = tag.trim().replace("_", "-");
  const parts = normalized.split("-");
  return parts[1]?.toUpperCase() ?? null;
}

function isMorocco(region: string | null, timezone: string | null): boolean {
  return region === "MA" || timezone === "Africa/Casablanca";
}

function isArabRegion(region: string | null, timezone: string | null): boolean {
  if (region && ARAB_COUNTRY_CODES.has(region)) return true;
  if (timezone && ARAB_TIMEZONES.has(timezone)) return true;
  return false;
}

function readTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

function detectMarket(region: string | null, timezone: string | null): Market {
  if (isMorocco(region, timezone)) return "morocco";
  if (isArabRegion(region, timezone)) return "arab";
  return "international";
}

export type DetectResult = {
  locale: Locale;
  currency: CurrencyCode;
  market: Market;
};

function resultForMarket(market: Market, preferredLocale?: Locale): DetectResult {
  const currency = currencyForMarket(market);
  if (market === "morocco") {
    const locale =
      preferredLocale === "en"
        ? "en"
        : preferredLocale === "ar"
          ? "ar"
          : "ar-ma";
    return { locale, currency, market };
  }
  if (market === "arab") {
    return { locale: "ar", currency, market };
  }
  return { locale: "en", currency, market };
}

export function detectLocaleAndCurrency(): DetectResult {
  if (typeof window === "undefined") {
    return resultForMarket("morocco");
  }

  const timezone = readTimezone();
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];

  let market: Market | null = null;
  let preferredLocale: Locale | undefined;

  for (const raw of langs) {
    const region = regionFromTag(raw);
    if (!market) market = detectMarket(region, timezone);

    const lang = raw.trim().toLowerCase().replace("_", "-");
    if (lang.startsWith("en")) preferredLocale = "en";
    else if (lang === "ar-ma") preferredLocale = "ar-ma";
    else if (lang.startsWith("ar")) preferredLocale = regionFromTag(raw) === "MA" ? "ar-ma" : "ar";
  }

  if (!market) market = detectMarket(null, timezone);
  return resultForMarket(market, preferredLocale);
}
