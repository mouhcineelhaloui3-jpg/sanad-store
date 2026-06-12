"use client";

import type { LiveTickerSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function IptvLiveTicker({ ticker }: { ticker: LiveTickerSection }) {
  const locale = useLocaleStore((s) => s.locale);
  const items = ticker.items.map((item) => t(item, locale));
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-neon-cyan/20 bg-dark-50/80 py-3 backdrop-blur-md">
      <div className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-dark-50 via-dark-50 to-transparent px-4">
        <span className="live-badge whitespace-nowrap text-xs">{t(ticker.label, locale)}</span>
      </div>
      <div className="marquee-track flex gap-8 pl-32">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 text-sm font-bold text-white/90 md:text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
