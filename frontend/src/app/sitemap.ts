import type { MetadataRoute } from "next";
import { policySlugs, staticRoutes } from "@/lib/seo/routes";
import { getSiteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  for (const slug of policySlugs) {
    entries.push({
      url: `${base}/policies/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5
    });
  }

  return entries;
}
