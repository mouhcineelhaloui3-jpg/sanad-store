import type { PlanCmsOverride } from "./types";
import { defaultPlans, type Plan } from "@/lib/plans";

export function mergePlansWithCms(overrides: PlanCmsOverride[]): Plan[] {
  return defaultPlans
    .map((plan) => {
      const override = overrides.find((o) => o.slug === plan.slug);
      if (!override) return plan;
      if (override.enabled === false) return null;
      return {
        ...plan,
        name: override.name ?? plan.name,
        duration: override.duration ?? plan.duration,
        price: override.price ?? plan.price,
        currency: override.currency ?? plan.currency,
        badge: override.badge !== undefined ? override.badge : plan.badge,
        features: override.features ?? plan.features,
        highlighted: override.highlighted ?? plan.highlighted
      };
    })
    .filter(Boolean) as Plan[];
}
