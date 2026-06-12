import { products } from "@/lib/products";

export const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/collection", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const }
];

export const policySlugs = ["shipping", "returns", "privacy", "terms"] as const;

export function getAllPublicPaths() {
  const productPaths = products.map((p) => `/product/${p.slug}`);
  const policyPaths = policySlugs.map((slug) => `/policies/${slug}`);
  return [
    ...staticRoutes.map((r) => r.path),
    ...productPaths,
    ...policyPaths
  ];
}
