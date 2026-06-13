import type { Metadata } from "next";
import { buildPageMetadata, type PageMetadataInput } from "@/lib/seo/metadata";

export type { PageMetadataInput };

/** Build complete Metadata API output with OpenGraph + Twitter cards. */
export function createPageMetadata(input: PageMetadataInput): Metadata {
  return buildPageMetadata(input);
}

export function createBlogMetadata(options: {
  title: string;
  description: string;
  slug: string;
  keywords?: string;
}): Metadata {
  return buildPageMetadata({
    title: options.title,
    description: options.description,
    path: `/blog/${options.slug}`,
    keywords: options.keywords ?? "IPTV Maroc, SANAD IPTV, abonnement IPTV"
  });
}

export function createLandingMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
}): Metadata {
  return buildPageMetadata({
    title: options.title,
    description: options.description,
    path: options.path,
    keywords: options.keywords
  });
}
