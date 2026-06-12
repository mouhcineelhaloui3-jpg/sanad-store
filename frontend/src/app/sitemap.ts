import type { MetadataRoute } from "next";
import { getStoreContent } from "@/lib/cms/server";
import { policySlugs, staticRoutes } from "@/lib/seo/routes";
import { getSiteUrl } from "@/lib/seo/metadata";
import { products } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getStoreContent();
  const base = getSiteUrl();
  const lastModified = new Date(content.updatedAt);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  for (const product of products) {
    entries.push({
      url: `${base}/product/${product.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85
    });
  }

  for (const slug of policySlugs) {
    entries.push({
      url: `${base}/policies/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4
    });
  }

  return entries;
}
