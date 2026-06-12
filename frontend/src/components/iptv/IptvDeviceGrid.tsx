"use client";

import { motion } from "framer-motion";
import type { DevicesSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function IptvDeviceGrid({ section }: { section: DevicesSection }) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section id="devices" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-eyebrow">DEVICES</p>
          <h2 className="section-title mt-2">{t(section.title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(section.subtitle, locale)}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.devices.map((device, i) => (
            <motion.div
              key={device.name.ar}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ borderColor: "rgba(0,229,255,0.4)" }}
              className="glass-card-hover p-6"
            >
              <span className="text-4xl">{device.icon}</span>
              <h3 className="mt-4 text-lg font-black text-white">{t(device.name, locale)}</h3>
              <p className="mt-2 text-sm leading-6 text-dark-700">{t(device.apps, locale)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
