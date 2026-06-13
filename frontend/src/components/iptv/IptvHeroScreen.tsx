"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocaleStore } from "@/store/localeStore";
import { t, type Locale, type LocalizedText } from "@/lib/i18n/localized";

type FixtureSlide = {
  league: LocalizedText;
  home: LocalizedText;
  away: LocalizedText;
  schedule: LocalizedText;
  note: LocalizedText;
};

const fixtures: FixtureSlide[] = [
  {
    league: { ar: "كأس العالم FIFA 2026™", en: "FIFA World Cup 2026™" },
    home: { ar: "🇲🇦 المغرب", en: "🇲🇦 Morocco" },
    away: { ar: "🇧🇷 البرازيل", en: "🇧🇷 Brazil" },
    schedule: { ar: "مجموعات · صيف 2026", en: "Group stage · Summer 2026" },
    note: { ar: "كل المباريات على باقتك", en: "Every match on your plan" }
  },
  {
    league: { ar: "دوري أبطال أوروبا", en: "UEFA Champions League" },
    home: { ar: "Real Madrid", en: "Real Madrid" },
    away: { ar: "Manchester City", en: "Manchester City" },
    schedule: { ar: "دور خروج المغلوب", en: "Knockout round" },
    note: { ar: "مباريات قادمة · 4K", en: "Upcoming fixtures · 4K" }
  },
  {
    league: { ar: "الدوري الإسباني", en: "La Liga" },
    home: { ar: "Real Madrid", en: "Real Madrid" },
    away: { ar: "Barcelona", en: "Barcelona" },
    schedule: { ar: "El Clásico · الموسم القادم", en: "El Clásico · Next round" },
    note: { ar: "بتغطية كاملة", en: "Full coverage included" }
  },
  {
    league: { ar: "Premier League", en: "Premier League" },
    home: { ar: "Liverpool", en: "Liverpool" },
    away: { ar: "Arsenal", en: "Arsenal" },
    schedule: { ar: "الجولة القادمة", en: "Next matchday" },
    note: { ar: "متوفر مع الاشتراك", en: "Included with subscription" }
  }
];

const ui = {
  upcoming: { ar: "مباريات قادمة", en: "Upcoming" } satisfies LocalizedText,
  vs: { ar: "ضد", en: "VS" } satisfies LocalizedText,
  disclaimer: {
    ar: "جدول توضيحي — التغطية حسب البث الرسمي",
    en: "Sample schedule — coverage when events air"
  } satisfies LocalizedText
};

function slideText(text: LocalizedText, locale: Locale) {
  return t(text, locale);
}

export function IptvHeroScreen() {
  const locale = useLocaleStore((s) => s.locale);
  const [idx, setIdx] = useState(0);
  const slide = fixtures[idx];

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % fixtures.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="tv-frame mx-auto w-full max-w-md"
      aria-label={slideText(ui.disclaimer, locale)}
    >
      <div className="tv-screen relative aspect-video overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-200 via-dark-100 to-dark-50" />
        <div className="scanline pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(0,245,255,0.06)_50%,transparent_60%)] animate-[shimmer_4s_ease-in-out_infinite]" />

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
            className="relative flex h-full flex-col justify-between p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-neon-cyan">
                {slideText(ui.upcoming, locale)}
              </span>
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold text-neon-gold">4K UHD</span>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-neon-cyan">
                {slideText(slide.league, locale)}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-white/60">
                {slideText(slide.schedule, locale)}
              </p>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <p className="text-right text-sm font-black leading-snug text-white md:text-base">
                  {slideText(slide.home, locale)}
                </p>
                <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  <p className="text-sm font-black text-neon-green">{slideText(ui.vs, locale)}</p>
                </div>
                <p className="text-left text-sm font-black leading-snug text-white md:text-base">
                  {slideText(slide.away, locale)}
                </p>
              </div>

              <p className="mt-4 text-xs font-bold text-neon-gold">{slideText(slide.note, locale)}</p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-1.5">
                {fixtures.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${i === idx ? "bg-neon-cyan" : "bg-white/20"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {["HD", "FHD", "4K"].map((q) => (
                  <span
                    key={q}
                    className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold text-white/70 ring-1 ring-white/10"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-2 text-center text-[10px] font-medium text-white/40">{slideText(ui.disclaimer, locale)}</p>
      <div className="mx-auto mt-2 h-2 w-24 rounded-full bg-gradient-to-r from-dark-400 to-dark-300" />
    </div>
  );
}
