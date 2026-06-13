"use client";

import { m  } from "@/components/motion";
import { Play } from "lucide-react";
import Image from "next/image";
import type { SportsSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { ui } from "@/lib/i18n/ui-strings";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function IptvSportsShowcase({ sports }: { sports: SportsSection }) {
  const locale = useLocaleStore((s) => s.locale);
  const openOrder = useIptvModalStore((s) => s.openOrder);

  return (
    <section id="sports" className="iptv-section-spacing relative px-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neon-green/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-eyebrow">2026 SPORTS</p>
          <h2 className="section-title mt-2">{t(sports.title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(sports.subtitle, locale)}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sports.events.map((event, i) => (
            <m.article
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative min-h-[220px] overflow-hidden rounded-2xl border shadow-glass transition hover:shadow-glow ${
                event.id === "wc2026"
                  ? "border-neon-gold/50 ring-2 ring-neon-gold/30 hover:border-neon-gold/70 hover:shadow-glow-gold"
                  : "border-white/10 hover:border-neon-cyan/40"
              }`}
            >
              {event.imageUrl ? (
                <>
                  <Image
                    src={event.imageUrl}
                    alt={t(event.title, locale)}
                    fill
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl" />
              )}

              {event.live ? (
                <span className="live-badge absolute left-4 top-4 z-10">● LIVE</span>
              ) : (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-dark-800 backdrop-blur">
                  SOON
                </span>
              )}

              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <div className="flex items-end gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/40 text-3xl ring-1 ring-white/20 backdrop-blur transition group-hover:scale-110">
                    {event.icon}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-neon-cyan">
                      {t(event.league, locale)}
                    </p>
                    <h3 className="mt-1 text-lg font-black leading-snug text-white">
                      {t(event.title, locale)}
                    </h3>
                    <p className="mt-2 inline-flex rounded-full bg-neon-gold/10 px-2 py-0.5 text-xs font-bold text-neon-gold ring-1 ring-neon-gold/30">
                      {t(event.quality, locale)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-dark-800 opacity-0 transition group-hover:opacity-100">
                  <Play className="h-3.5 w-3.5 text-neon-green" />
                  {ui("includedSub", locale)}
                </div>
              </div>
            </m.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="cta-panel mx-auto inline-flex w-full max-w-md justify-center rounded-2xl p-4 md:bg-transparent md:p-0 md:border-0">
            <button type="button" onClick={() => openOrder()} className="btn-neon w-full px-10 text-base">
              {t(sports.ctaLabel, locale)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
