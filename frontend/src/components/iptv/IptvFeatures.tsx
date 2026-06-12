"use client";

import { motion } from "framer-motion";
import type { FeatureItem } from "@/lib/cms/types";
import type { LocalizedText } from "@/lib/i18n/localized";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function IptvFeatures({
  title,
  subtitle,
  features
}: {
  title: LocalizedText;
  subtitle: LocalizedText;
  features: FeatureItem[];
}) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-eyebrow">{t(title, locale)}</p>
          <h2 className="section-title mt-2">{t(title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(subtitle, locale)}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.label.ar}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card-hover flex items-center gap-4 p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10 text-2xl">
                {feature.icon}
              </span>
              <span className="font-bold text-white">{t(feature.label, locale)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
