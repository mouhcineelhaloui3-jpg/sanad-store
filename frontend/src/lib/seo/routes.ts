import { blogSlugs } from "@/lib/blog/posts";
import { programmaticSlugs } from "@/lib/seo/programmatic-pages";

type RouteEntry = { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" };

const coreRoutes: RouteEntry[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/pricing", priority: 0.95, changeFrequency: "weekly" },
  { path: "/trial", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/iptv-3-months", priority: 0.9, changeFrequency: "weekly" },
  { path: "/iptv-6-months", priority: 0.9, changeFrequency: "weekly" },
  { path: "/iptv-12-months", priority: 0.9, changeFrequency: "weekly" }
];

const programmaticRoutes: RouteEntry[] = programmaticSlugs.map((slug) => ({
  path: `/iptv/${slug}`,
  priority: 0.85,
  changeFrequency: "weekly" as const
}));

const blogRoutes: RouteEntry[] = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: 0.8,
  changeFrequency: "weekly" as const
}));

export const staticRoutes = [...coreRoutes, ...programmaticRoutes, ...blogRoutes];

export const policySlugs = ["privacy", "terms"] as const;

export { blogSlugs };

export function getAllPublicPaths() {
  const policyPaths = policySlugs.map((slug) => `/policies/${slug}`);
  const marketingPaths = staticRoutes.map((route) => route.path).filter((path) => path !== "/");
  return ["/", ...marketingPaths, ...policyPaths];
}
