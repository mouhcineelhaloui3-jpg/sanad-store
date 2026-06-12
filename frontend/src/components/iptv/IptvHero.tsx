"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { HeroContent } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { whatsappUrl } from "@/lib/store-config";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";
import { AnimatedCounter } from "./AnimatedCounter";
import { IptvHeroScreen } from "./IptvHeroScreen";

export function IptvHero({
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
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-xs font-bold text-neon-cyan md:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
            {t(hero.trustLine, locale)}
          </div>

          <h1 className="text-4xl font-black leading-[1.1] md:text-5xl lg:text-6xl">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className={
                  i === 0 ? "neon-text-shimmer block" : "mt-2 block text-white"
                }
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-dark-800 md:text-lg">
            {t(hero.subtitle, locale)}
          </p>

          <div className="mt-6 rounded-2xl border border-neon-gold/25 bg-gradient-to-r from-neon-gold/10 to-transparent p-4 ring-1 ring-neon-gold/20">
            <p className="text-sm font-bold text-neon-gold md:text-base">{t(hero.bannerText, locale)}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={openTrial} className="btn-gold">
              {t(hero.primaryCtaLabel, locale)}
            </button>
            <button type="button" onClick={() => openOrder()} className="btn-neon">
              {t(hero.secondaryCtaLabel, locale)}
            </button>
            <a
              href={whatsappUrl(whatsappMessage, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-5 w-5" />
              {t(hero.whatsappCtaLabel, locale)}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { value: 100000, label: locale === "ar" ? "قناة" : "channels" },
              { value: 50000, label: locale === "ar" ? "عميل" : "clients" },
              { value: 99, label: locale === "ar" ? "رضا" : "rating", suffix: "%" as const }
            ].map((stat) => (
              <div key={stat.label} className="glass-card px-3 py-4 text-center">
                <p className="text-xl font-black text-neon-cyan md:text-2xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.suffix === "%" ? "" : "+"}
                    suffix={stat.suffix ?? ""}
                  />
                </p>
                <p className="mt-0.5 text-xs font-bold text-dark-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 blur-2xl" />
          <IptvHeroScreen />
        </motion.div>
      </div>
    </section>
  );
}
