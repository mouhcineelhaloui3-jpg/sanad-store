"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { HeroContent } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { whatsappUrl } from "@/lib/store-config";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";
import { AnimatedCounter } from "./AnimatedCounter";

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
    <section className="relative overflow-hidden px-4 pb-20 pt-12 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-5 py-2 text-sm font-bold text-neon-cyan">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
            {t(hero.trustLine, locale)}
          </div>

          <h1 className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
            {headlineLines.map((line, i) => (
              <span key={i} className={i === 0 ? "neon-text block" : "mt-2 block text-white"}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-dark-800 md:text-xl">
            {t(hero.subtitle, locale)}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-8 max-w-2xl rounded-2xl border border-neon-gold/30 bg-neon-gold/10 px-6 py-4 text-base font-bold text-neon-gold md:text-lg"
          >
            {t(hero.bannerText, locale)}
          </motion.div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={openTrial} className="btn-gold min-w-[200px]">
              {t(hero.primaryCtaLabel, locale)}
            </button>
            <button type="button" onClick={() => openOrder()} className="btn-neon min-w-[200px]">
              {t(hero.secondaryCtaLabel, locale)}
            </button>
            <a
              href={whatsappUrl(whatsappMessage, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp min-w-[200px]"
            >
              <MessageCircle className="h-5 w-5" />
              {t(hero.whatsappCtaLabel, locale)}
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: 100000, label: locale === "ar" ? "قناة" : "channels" },
              { value: 50000, label: locale === "ar" ? "عميل" : "customers" },
              { value: 99, label: locale === "ar" ? "رضا" : "satisfaction", suffix: "%" as const }
            ].map((stat) => (
              <div key={stat.label} className="glass-card px-4 py-6">
                <p className="text-2xl font-black text-neon-cyan md:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.suffix === "%" ? "" : "+"}
                    suffix={stat.suffix ?? ""}
                  />
                </p>
                <p className="mt-1 text-sm font-bold text-dark-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
