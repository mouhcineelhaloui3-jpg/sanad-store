"use client";

import { Zap, Shield, Headphones } from "lucide-react";
import { t, type LocalizedText } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

const cards: { icon: typeof Zap; title: LocalizedText; subtitle: LocalizedText }[] = [
  {
    icon: Zap,
    title: { ar: "بث مستقر", en: "Stable streaming" },
    subtitle: { ar: "استقرار 99.9%", en: "99.9% uptime" }
  },
  {
    icon: Shield,
    title: { ar: "IPTV 4K و HD", en: "4K & HD IPTV" },
    subtitle: { ar: "صورة واضحة بدون تقطيع", en: "Crystal clear, no buffering" }
  },
  {
    icon: Headphones,
    title: { ar: "دعم 7/7", en: "7-day support" },
    subtitle: { ar: "جواب واتساب فـ 30 دقيقة", en: "WhatsApp reply in 30 min" }
  }
];

/** Lightweight hero trust strip — CSS only, no motion library. */
export function IptvHeroTrustCards() {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section className="px-4 pb-4 pt-2" aria-label="Trust highlights">
      <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
        {cards.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title.en}
            className="glass-card flex items-center gap-3 px-4 py-3 text-start sm:flex-col sm:px-5 sm:py-4 sm:text-center"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-black text-white">{t(title, locale)}</p>
              <p className="text-xs font-bold text-white/70">{t(subtitle, locale)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
