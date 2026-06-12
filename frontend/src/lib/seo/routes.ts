export const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "daily" as const }
];

export const policySlugs = ["privacy", "terms"] as const;

export function getAllPublicPaths() {
  const policyPaths = policySlugs.map((slug) => `/policies/${slug}`);
  return ["/", ...policyPaths];
}
