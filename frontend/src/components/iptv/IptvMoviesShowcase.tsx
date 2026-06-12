"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Film, Play, Star } from "lucide-react";
import type { MoviesSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";
import { AnimatedCounter } from "./AnimatedCounter";
import { RevealOnScroll } from "./RevealOnScroll";

function MovieCard({
  movie,
  locale
}: {
  movie: MoviesSection["items"][0];
  locale: "ar" | "en";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]));

  return (
    <motion.article
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.04, z: 20 }}
      className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-glass"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${movie.posterGradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="scanline pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="rounded-md bg-neon-gold/20 px-2 py-0.5 text-[10px] font-black text-neon-gold ring-1 ring-neon-gold/30">
            {t(movie.quality, locale)}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-bold text-neon-gold">
            <Star className="h-3 w-3 fill-neon-gold" />
            {movie.rating}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
            {t(movie.genre, locale)} • {movie.year}
          </p>
          <h3 className="mt-1 text-sm font-black leading-tight text-white md:text-base">
            {t(movie.title, locale)}
          </h3>
          <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-neon-green opacity-0 transition group-hover:opacity-100">
            <Play className="h-3 w-3" />
            {locale === "ar" ? "متاح للمشتركين" : "Available now"}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function IptvMoviesShowcase({ movies }: { movies: MoviesSection }) {
  const locale = useLocaleStore((s) => s.locale);
  const openOrder = useIptvModalStore((s) => s.openOrder);
  const featured = movies.items.filter((m) => m.featured);
  const doubled = [...movies.marqueeTitles, ...movies.marqueeTitles];

  return (
    <section id="movies" className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-neon-cyan/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-right">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-neon-cyan/20 text-4xl ring-2 ring-purple-500/30">
              <Film className="h-10 w-10 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <p className="section-eyebrow">CINEMA 2026</p>
              <h2 className="section-title mt-1">{t(movies.title, locale)}</h2>
              <p className="section-subtitle mx-auto md:mx-0">{t(movies.subtitle, locale)}</p>
            </div>
            <div className="glass-card px-6 py-4 text-center">
              <p className="text-3xl font-black text-neon-cyan">
                <AnimatedCounter value={movies.totalCount} prefix="+" />
              </p>
              <p className="text-xs font-bold text-dark-700">
                {locale === "ar" ? "فيلم ومسلسل" : "titles"}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {movies.genres.map((g) => (
              <span
                key={g.ar}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-white transition hover:border-neon-cyan/40 hover:bg-neon-cyan/10"
              >
                {t(g, locale)}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        <div className="relative mt-10 overflow-hidden py-2">
          <div className="marquee-track-slow flex gap-6">
            {doubled.map((title, i) => (
              <span
                key={`${title.ar}-${i}`}
                className="shrink-0 text-sm font-bold text-dark-700 md:text-base"
              >
                🎬 {t(title, locale)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
          {featured.map((movie, i) => (
            <RevealOnScroll key={movie.id} delay={i * 0.04}>
              <MovieCard movie={movie} locale={locale} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <div className="mt-12 text-center">
            <button type="button" onClick={() => openOrder()} className="btn-gold px-10 text-base">
              {t(movies.ctaLabel, locale)}
            </button>
            <p className="mt-3 text-xs text-dark-700">
              {locale === "ar"
                ? "محتوى جديد كل يوم — أفلام 2024، 2025، 2026"
                : "Fresh content daily — 2024, 2025, 2026 releases"}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
