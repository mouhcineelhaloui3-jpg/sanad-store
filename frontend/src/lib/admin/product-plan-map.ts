import type { ProductDto } from "@/lib/db/products";

export const STOREFRONT_PLAN_SLUGS = [
  "plan-3-months",
  "plan-6-months",
  "plan-12-months",
  "plan-2-screens"
] as const;

export type StorefrontPlanSlug = (typeof STOREFRONT_PLAN_SLUGS)[number];

/** Map admin product duration + devices to the storefront plan slug. */
export function planSlugForProduct(product: Pick<ProductDto, "duration" | "deviceLimit">): StorefrontPlanSlug | null {
  if (product.duration === "3m") return "plan-3-months";
  if (product.duration === "6m") return "plan-6-months";
  if (product.duration === "12m") {
    return product.deviceLimit >= 2 ? "plan-2-screens" : "plan-12-months";
  }
  return null;
}

export function planConfigForSlug(slug: StorefrontPlanSlug): { duration: string; deviceLimit: number } {
  switch (slug) {
    case "plan-3-months":
      return { duration: "3m", deviceLimit: 1 };
    case "plan-6-months":
      return { duration: "6m", deviceLimit: 1 };
    case "plan-12-months":
      return { duration: "12m", deviceLimit: 1 };
    case "plan-2-screens":
      return { duration: "12m", deviceLimit: 2 };
  }
}
