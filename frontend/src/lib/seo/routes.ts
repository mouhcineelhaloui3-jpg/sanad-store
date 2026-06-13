export const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/pricing", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/trial", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog/best-iptv-maroc", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/blog/iptv-smart-tv", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog/iptv-android", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog/iptv-4k", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/iptv-3-months", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/iptv-6-months", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/iptv-12-months", priority: 0.9, changeFrequency: "weekly" as const }
] as const;

export const policySlugs = ["privacy", "terms"] as const;

export const blogSlugs = [
  "best-iptv-maroc",
  "iptv-smart-tv",
  "iptv-android",
  "iptv-4k"
] as const;

export function getAllPublicPaths() {
  const policyPaths = policySlugs.map((slug) => `/policies/${slug}`);
  const marketingPaths = staticRoutes.map((route) => route.path).filter((path) => path !== "/");
  return ["/", ...marketingPaths, ...policyPaths];
}
