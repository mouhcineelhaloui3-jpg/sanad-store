"use client";

import { motion } from "framer-motion";
import type { StatItem } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";
import { AnimatedCounter } from "./AnimatedCounter";

export function IptvStats({ stats }: { stats: StatItem[] }) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label.ar}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6 text-center"
            >
              <p className="text-2xl font-black text-neon-cyan md:text-3xl">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold text-dark-700">{t(stat.label, locale)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
