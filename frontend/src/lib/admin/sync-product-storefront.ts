import { revalidatePath, revalidateTag } from "next/cache";
import type { ProductDto } from "@/lib/db/products";
import { getCmsContentFromDb, saveCmsContentToDb } from "@/lib/db/site-content";
import type { PlanCmsOverride } from "@/lib/cms/types";
import { defaultPlans } from "@/lib/plans";
import { planSlugForProduct } from "@/lib/admin/product-plan-map";

export { planConfigForSlug, planSlugForProduct, STOREFRONT_PLAN_SLUGS } from "@/lib/admin/product-plan-map";
export type { StorefrontPlanSlug } from "@/lib/admin/product-plan-map";

function revalidateStorefrontCache() {
  revalidateTag("cms", "max");
  revalidatePath("/");
  revalidatePath("/pricing");
}

/** Push product price/status/name into CMS plan overrides so the public site updates. */
export async function syncProductToStorefront(
  product: ProductDto,
  audit?: { userId: string; ip?: string | null }
): Promise<ReturnType<typeof planSlugForProduct>> {
  const slug = planSlugForProduct(product);
  if (!slug) return null;

  const content = await getCmsContentFromDb();
  const defaultPlan = defaultPlans.find((p) => p.slug === slug);
  const existing = content.plans.find((p) => p.slug === slug);

  const patch: PlanCmsOverride = {
    slug,
    price: product.price,
    enabled: product.isActive,
    name: {
      ar: product.name,
      en: existing?.name?.en ?? defaultPlan?.name.en ?? product.name
    }
  };

  const plans = content.plans.some((p) => p.slug === slug)
    ? content.plans.map((p) => (p.slug === slug ? { ...p, ...patch } : p))
    : [...content.plans, patch];

  await saveCmsContentToDb({ ...content, plans }, audit);
  revalidateStorefrontCache();
  return slug;
}

/** Disable storefront plan when admin product is removed. */
export async function disableStorefrontPlanForProduct(
  product: Pick<ProductDto, "duration" | "deviceLimit">,
  audit?: { userId: string; ip?: string | null }
) {
  const slug = planSlugForProduct(product);
  if (!slug) return;

  const content = await getCmsContentFromDb();
  const plans = content.plans.some((p) => p.slug === slug)
    ? content.plans.map((p) => (p.slug === slug ? { ...p, enabled: false } : p))
    : [...content.plans, { slug, enabled: false }];

  await saveCmsContentToDb({ ...content, plans }, audit);
  revalidateStorefrontCache();
}
