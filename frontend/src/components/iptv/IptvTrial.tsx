"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import type { TrialSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function IptvTrial({ trial }: { trial: TrialSection }) {
  const locale = useLocaleStore((s) => s.locale);
  const openTrial = useIptvModalStore((s) => s.openTrial);

  return (
    <section id="trial" className="iptv-section-spacing px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neon-green/30 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-cyan/10 p-10 text-center md:p-16"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-green/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-neon-cyan/10 blur-3xl" />

        <Gift className="mx-auto h-16 w-16 text-neon-green" />
        <h2 className="mt-6 text-3xl font-black text-white md:text-4xl">{t(trial.title, locale)}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-dark-800">{t(trial.description, locale)}</p>
        <button type="button" onClick={openTrial} className="btn-gold mt-8 min-w-[240px] text-lg">
          {t(trial.ctaLabel, locale)}
        </button>
      </motion.div>
    </section>
  );
}
