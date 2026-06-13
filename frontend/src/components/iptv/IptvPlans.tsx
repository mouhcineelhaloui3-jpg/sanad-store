"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LocalizedText } from "@/lib/i18n/localized";
import { t } from "@/lib/i18n/localized";
import { formatPlanPrice } from "@/lib/i18n/currency";
import { ui } from "@/lib/i18n/ui-strings";
import type { Plan } from "@/lib/plans";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function IptvPlans({
  title,
  subtitle,
  plans
}: {
  title: LocalizedText;
  subtitle: LocalizedText;
  plans: Plan[];
}) {
  const locale = useLocaleStore((s) => s.locale);
  const currency = useLocaleStore((s) => s.currency);
  const openOrder = useIptvModalStore((s) => s.openOrder);

  return (
    <section id="plans" className="iptv-section-spacing px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-eyebrow">{t(title, locale)}</p>
          <h2 className="section-title mt-2">{t(title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(subtitle, locale)}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const price = formatPlanPrice(plan.price, currency, locale);
            return (
              <motion.div
                key={plan.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-neon-cyan/50 bg-gradient-to-b from-neon-cyan/10 to-transparent shadow-glow"
                    : "glass-card"
                }`}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-neon-gold to-orange-500 px-4 py-1 text-xs font-black text-white">
                    {t(plan.badge, locale)}
                  </span>
                ) : null}

                <h3 className="text-xl font-black text-white">{t(plan.name, locale)}</h3>
                <p className="mt-1 text-sm text-white/75">{t(plan.duration, locale)}</p>

                <div className="my-6">
                  <span className="text-4xl font-black text-neon-cyan">{price.primary}</span>
                  {price.madNote ? (
                    <p className="mt-1 text-xs font-bold text-white/70">{price.madNote}</p>
                  ) : null}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.ar} className="flex items-center gap-2 text-sm text-white/85">
                      <Check className="h-4 w-4 shrink-0 text-neon-green" />
                      {t(f, locale)}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openOrder(plan.slug)}
                  className={plan.highlighted ? "btn-neon w-full" : "btn-neon-outline w-full"}
                >
                  {ui("subscribeNow", locale)}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
