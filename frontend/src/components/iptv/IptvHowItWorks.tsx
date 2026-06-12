"use client";

import { motion } from "framer-motion";
import type { HowItWorksSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function IptvHowItWorks({ section }: { section: HowItWorksSection }) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section id="how-it-works" className="iptv-section-spacing px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-eyebrow">SETUP</p>
          <h2 className="section-title mt-2">{t(section.title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(section.subtitle, locale)}</p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute top-12 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent md:block" />

          {section.steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-green/10 text-3xl ring-2 ring-neon-cyan/30 shadow-glow">
                {step.icon}
              </div>
              <span className="mt-4 block font-latin text-xs font-black tracking-[0.3em] text-neon-cyan">
                {step.num}
              </span>
              <h3 className="mt-2 text-xl font-black text-white">{t(step.title, locale)}</h3>
              <p className="mt-3 text-sm leading-7 text-dark-800">{t(step.description, locale)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
