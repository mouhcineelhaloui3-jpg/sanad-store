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
    <section id="features" className="iptv-section-spacing px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-eyebrow">PREMIUM 2026</p>
          <h2 className="section-title mt-2">{t(title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(subtitle, locale)}</p>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const wide = i === 0 || i === 5;
            return (
              <motion.div
                key={feature.label.ar}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className={`glass-card-hover group flex flex-col justify-center p-5 ${
                  wide ? "sm:col-span-2 lg:col-span-2" : ""
                } ${i === 0 ? "border-neon-cyan/20 bg-neon-cyan/5" : ""}`}
              >
                <span className="text-3xl transition group-hover:scale-110">{feature.icon}</span>
                <span className="mt-3 text-base font-black text-white md:text-lg">
                  {t(feature.label, locale)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
