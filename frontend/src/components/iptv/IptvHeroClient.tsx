"use client";

import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";
import type { HeroContent } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { ui } from "@/lib/i18n/ui-strings";
import { whatsappUrl } from "@/lib/store-config";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";
import { AnimatedCounter } from "./AnimatedCounter";

const IptvHeroScreen = dynamic(
  () => import("./IptvHeroScreen").then((mod) => mod.IptvHeroScreen),
  {
    ssr: false,
    loading: () => (
      <div className="tv-frame mx-auto aspect-video w-full max-w-md animate-pulse rounded-xl bg-white/5" aria-hidden />
    )
  }
);

const heroBadges = [
  { ar: "🏆 FIFA 2026™", en: "🏆 FIFA 2026™" },
  { ar: "📺 +100K قناة", en: "📺 +100K channels" },
  { ar: "🎬 +200K فيلم", en: "🎬 +200K movies" },
  { ar: "⚡ تفعيل فوري", en: "⚡ Instant setup" }
];

/** Client island: CTAs + locale text + deferred TV widget */
export function IptvHeroClient({
  hero,
  whatsappNumber,
  whatsappMessage
}: {
  hero: HeroContent;
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  const locale = useLocaleStore((s) => s.locale);
  const openTrial = useIptvModalStore((s) => s.openTrial);
  const openOrder = useIptvModalStore((s) => s.openOrder);
  const headlineLines = t(hero.headline, locale).split("\n");

  return (
    <section className="iptv-hero-spacing relative overflow-hidden px-4">
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px] md:block" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <span
                key={badge.en}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black text-white backdrop-blur-md md:text-xs"
              >
                {t(badge, locale)}
              </span>
            ))}
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-xs font-bold text-neon-cyan md:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green" aria-hidden />
            {t(hero.trustLine, locale)}
          </div>

          <h1 className="text-4xl font-black leading-[1.1] md:text-5xl lg:text-6xl">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className={i === 0 ? "neon-text block" : "mt-2 block text-white"}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/90 md:text-lg">
            {t(hero.subtitle, locale)}
          </p>

          <div className="mt-6 rounded-2xl border border-neon-gold/25 bg-gradient-to-r from-neon-gold/10 to-transparent p-4 ring-1 ring-neon-gold/20">
            <p className="text-sm font-bold text-neon-gold md:text-base">{t(hero.bannerText, locale)}</p>
          </div>

          <div className="cta-panel mt-8 flex w-full flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:flex-wrap sm:gap-3 md:border-0 md:bg-transparent md:p-0">
            <button type="button" onClick={openTrial} className="btn-gold w-full sm:w-auto">
              {t(hero.primaryCtaLabel, locale)}
            </button>
            <button type="button" onClick={() => openOrder()} className="btn-neon w-full sm:w-auto">
              {t(hero.secondaryCtaLabel, locale)}
            </button>
            <a
              href={whatsappUrl(whatsappMessage, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {t(hero.whatsappCtaLabel, locale)}
            </a>
          </div>

          <div className="mt-10 max-w-xs">
            <div className="glass-card px-4 py-4 text-center">
              <p className="text-2xl font-black text-neon-cyan md:text-3xl">
                <AnimatedCounter value={100000} prefix="+" />
              </p>
              <p className="mt-0.5 text-xs font-bold text-white/85">{ui("channels", locale)}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 hidden rounded-3xl bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 blur-2xl md:block" aria-hidden />
          <IptvHeroScreen />
        </div>
      </div>
    </section>
  );
}
