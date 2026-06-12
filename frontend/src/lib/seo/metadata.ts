import type { Metadata } from "next";
import { storeConfig } from "@/lib/store-config";
import type { BrandingContent, SeoContent } from "@/lib/cms/types";

export function getSiteUrl() {
  return storeConfig.siteUrl.replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getSiteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function resolveOgImage(url?: string) {
  if (url?.trim()) return absoluteUrl(url.trim());
  return absoluteUrl("/opengraph-image");
}

export function parseKeywords(keywords: string): string[] {
  return keywords
    .split(/[,،]/)
    .map((k) => k.trim())
    .filter(Boolean);
}

export function buildRootMetadata(seo: SeoContent, branding?: BrandingContent): Metadata {
  const siteUrl = getSiteUrl();
  const brand = branding?.brandName ?? storeConfig.brand;
  const ogImage = resolveOgImage(seo.ogImageUrl);
  const verification: Metadata["verification"] = {};

  if (seo.googleSiteVerification?.trim()) {
    verification.google = seo.googleSiteVerification.trim();
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${brand}`
    },
    description: seo.description,
    keywords: parseKeywords(seo.keywords),
    alternates: { canonical: "/" },
    verification,
    openGraph: {
      type: "website",
      locale: "ar_MA",
      url: siteUrl,
      siteName: brand,
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.ogTitle || seo.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: [ogImage]
    },
    robots: { index: true, follow: true }
  };
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogTitle?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(options.path);
  const ogImage = resolveOgImage(options.ogImage);
  const ogTitle = options.ogTitle ?? options.title;

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "ar_MA",
      url: canonical,
      title: ogTitle,
      description: options.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: options.description,
      images: [ogImage]
    },
    robots: options.noIndex ? { index: false, follow: false } : { index: true, follow: true }
  };
}
