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

function buildOpenGraph(options: {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  brand: string;
}) {
  return {
    type: "website" as const,
    locale: "en_US",
    alternateLocale: ["ar"],
    url: options.url,
    siteName: options.brand,
    title: options.title,
    description: options.description,
    images: [
      {
        url: options.ogImage,
        width: 1200,
        height: 630,
        alt: options.title,
        type: "image/png"
      }
    ]
  };
}

function buildTwitter(options: { title: string; description: string; ogImage: string }) {
  return {
    card: "summary_large_image" as const,
    title: options.title,
    description: options.description,
    images: [options.ogImage]
  };
}

export function buildRootMetadata(seo: SeoContent, branding?: BrandingContent): Metadata {
  const siteUrl = getSiteUrl();
  const brand = branding?.brandName ?? storeConfig.brand;
  const ogImage = resolveOgImage(seo.ogImageUrl);
  const ogTitle = seo.ogTitle || seo.title;
  const ogDescription = seo.ogDescription || seo.description;
  const verification: Metadata["verification"] = {};

  if (seo.googleSiteVerification?.trim()) {
    verification.google = seo.googleSiteVerification.trim();
  }

  return {
    metadataBase: new URL(siteUrl),
    applicationName: brand,
    title: {
      default: seo.title,
      template: `%s | ${brand}`
    },
    description: seo.description?.trim() || `${brand} — Premium IPTV worldwide with free trial and 24/7 WhatsApp support.`,
    keywords: parseKeywords(seo.keywords),
    authors: [{ name: brand, url: siteUrl }],
    creator: brand,
    publisher: brand,
    category: "IPTV",
    formatDetection: {
      telephone: true,
      email: true,
      address: false
    },
    appleWebApp: {
      capable: true,
      title: brand,
      statusBarStyle: "black-translucent"
    },
    alternates: {
      canonical: "/",
      languages: {
        ar: "/",
        en: "/",
        "x-default": "/"
      }
    },
    verification,
    icons: {
      icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
      shortcut: "/icon"
    },
    openGraph: buildOpenGraph({
      title: ogTitle,
      description: ogDescription,
      url: siteUrl,
      ogImage,
      brand
    }),
    twitter: buildTwitter({ title: ogTitle, description: ogDescription, ogImage }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    other: {
      "content-language": "ar, en"
    }
  };
}

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function buildPageMetadata(options: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(options.path);
  const ogImage = resolveOgImage(options.ogImage);
  const ogTitle = options.ogTitle ?? options.title;
  const ogDescription = options.ogDescription ?? options.description;
  const pageType = options.type ?? "website";

  return {
    title: options.title,
    description:
      options.description?.trim() ||
      "SANAD IPTV — Premium IPTV worldwide: 115,000+ channels, 120,000+ VOD, 4K sports, free trial.",
    keywords: options.keywords ? parseKeywords(options.keywords) : undefined,
    alternates: { canonical },
    openGraph: {
      ...buildOpenGraph({
        title: ogTitle,
        description: ogDescription,
        url: canonical,
        ogImage,
        brand: storeConfig.brand
      }),
      ...(pageType === "article" ? { type: "article" as const } : {})
    },
    twitter: buildTwitter({ title: ogTitle, description: ogDescription, ogImage }),
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        },
    other: {
      "content-language": "ar, en"
    }
  };
}
