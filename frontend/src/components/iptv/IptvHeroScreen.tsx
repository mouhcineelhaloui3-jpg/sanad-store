"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore } from "@/store/localeStore";
import type { Locale } from "@/lib/i18n/localized";

const matches: Record<
  Locale,
  { home: string; away: string; league: string; score: string; min: string }[]
> = {
  ar: [
    { home: "🇲🇦 المغرب", away: "🇧🇷 البرازيل", league: "كأس العالم FIFA 2026™", score: "2 - 1", min: "78'" },
    { home: "Real Madrid", away: "Barcelona", league: "La Liga", score: "2 - 1", min: "67'" },
    { home: "Man City", away: "Liverpool", league: "Premier League", score: "1 - 1", min: "HT" },
    { home: "PSG", away: "Bayern", league: "Champions League", score: "0 - 0", min: "23'" }
  ],
  en: [
    { home: "🇲🇦 Morocco", away: "🇧🇷 Brazil", league: "FIFA World Cup 2026™", score: "2 - 1", min: "78'" },
    { home: "Real Madrid", away: "Barcelona", league: "La Liga", score: "2 - 1", min: "67'" },
    { home: "Man City", away: "Liverpool", league: "Premier League", score: "1 - 1", min: "HT" },
    { home: "PSG", away: "Bayern", league: "Champions League", score: "0 - 0", min: "23'" }
  ]
};

export function IptvHeroScreen() {
  const locale = useLocaleStore((s) => s.locale);
  const list = matches[locale];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  const m = list[idx];

  return (
    <div className="tv-frame mx-auto w-full max-w-md">
      <div className="tv-screen relative aspect-video overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-200 via-dark-100 to-dark-50" />
        <div className="scanline pointer-events-none absolute inset-0 opacity-[0.07]" />

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="relative flex h-full flex-col justify-between p-5"
          >
            <div className="flex items-center justify-between">
              <span className="live-badge">● LIVE</span>
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold text-neon-gold">
                4K UHD
              </span>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-neon-cyan">{m.league}</p>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-black text-white md:text-base">{m.home}</p>
                </div>
                <div className="rounded-2xl bg-neon-cyan/10 px-4 py-2 ring-1 ring-neon-cyan/30">
                  <p className="text-2xl font-black tabular-nums text-neon-cyan">{m.score}</p>
                  <p className="text-[10px] font-bold text-neon-green">{m.min}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white md:text-base">{m.away}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {["HD", "FHD", "4K", "60FPS"].map((q) => (
                <span
                  key={q}
                  className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold text-dark-800 ring-1 ring-white/10"
                >
                  {q}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mx-auto mt-3 h-2 w-24 rounded-full bg-gradient-to-r from-dark-400 to-dark-300" />
    </div>
  );
}
