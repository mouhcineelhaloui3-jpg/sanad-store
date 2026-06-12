/** @deprecated Legacy product merge — IPTV uses merge-plans.ts */
import { defaultPlans } from "@/lib/plans";
import type { PlanCmsOverride } from "./types";

export function mergeProductsWithCms(_overrides: PlanCmsOverride[] = []) {
  return defaultPlans;
}

export function getMergedCatalog(overrides: PlanCmsOverride[] = []) {
  return mergeProductsWithCms(overrides);
}

export function getMergedProductBySlug(slug: string, overrides: PlanCmsOverride[] = []) {
  return getMergedCatalog(overrides).find((p) => p.slug === slug);
}

export function getProductOverride(slug: string, overrides: PlanCmsOverride[] = []) {
  return overrides.find((o) => o.slug === slug);
}
