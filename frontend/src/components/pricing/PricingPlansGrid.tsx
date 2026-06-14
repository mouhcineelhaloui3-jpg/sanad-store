"use client";

import Link from "next/link";
import { formatPlanPrice } from "@/lib/i18n/currency";
import { t, type LocalizedText } from "@/lib/i18n/localized";
import { planLandingPath } from "@/lib/plan-routes";
import type { Plan } from "@/lib/plans";
import { useLocaleStore } from "@/store/localeStore";

const detailsLabel: LocalizedText = { ar: "التفاصيل", en: "View plan" };

export function PricingPlansGrid({ plans }: { plans: Plan[] }) {
  const locale = useLocaleStore((s) => s.locale);
  const currency = useLocaleStore((s) => s.currency);

  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => {
        const price = formatPlanPrice(plan.price, currency, locale);
        const landingPath = planLandingPath(plan.slug);
        return (
          <div
            key={plan.slug}
            className={`glass-card rounded-2xl p-6 ${plan.highlighted ? "ring-2 ring-neon-cyan" : ""}`}
          >
            <h2 className="text-xl font-black text-white">{t(plan.name, locale)}</h2>
            <p className="mt-2 text-3xl font-black text-neon-cyan">{price.primary}</p>
            {price.madNote ? <p className="mt-1 text-xs font-semibold text-white/60">{price.madNote}</p> : null}
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {plan.features.map((f) => (
                <li key={f.en}>✓ {t(f, locale)}</li>
              ))}
            </ul>
            <Link href={landingPath} className="btn-neon mt-6 inline-block w-full text-center">
              {t(detailsLabel, locale)}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
