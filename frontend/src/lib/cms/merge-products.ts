import { products as baseProducts, type Product } from "@/lib/products";
import type { ProductCmsOverride } from "./types";

export function mergeProductsWithCms(overrides: ProductCmsOverride[]): Product[] {
  return baseProducts
    .map((product) => {
      const override = overrides.find((item) => item.slug === product.slug);
      if (!override || override.enabled === false) return null;

      const reviews =
        override.reviews && override.reviews.length > 0 ? override.reviews : product.reviews;
      const ratingValue =
        override.ratingValue ??
        (reviews.length
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : product.ratingValue);
      const ratingCount = override.ratingCount ?? (reviews.length || product.ratingCount);

      return {
        ...product,
        nameAr: override.nameAr ?? product.nameAr,
        price: override.price ?? product.price,
        upsellPrice: override.upsellPrice ?? product.upsellPrice,
        headline: override.headline ?? product.headline,
        subheadline: override.subheadline ?? product.subheadline,
        bullets: override.bullets ?? product.bullets,
        reviews,
        faqs: override.faqs ?? product.faqs,
        ratingValue,
        ratingCount
      } satisfies Product;
    })
    .filter((product): product is Product => product !== null);
}

export function getProductOverride(
  overrides: ProductCmsOverride[],
  slug: string
): ProductCmsOverride | undefined {
  return overrides.find((item) => item.slug === slug);
}

export async function getMergedCatalog() {
  const { getStoreContent } = await import("./server");
  const content = await getStoreContent();
  return mergeProductsWithCms(content.products);
}

export async function getMergedProductBySlug(slug: string) {
  const catalog = await getMergedCatalog();
  return catalog.find((p) => p.slug === slug);
}
