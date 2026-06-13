import {
  articleJsonLd,
  aggregateRatingJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  plansOfferCatalogJsonLd,
  productJsonLd,
  reviewJsonLd,
  serviceJsonLd,
  webPageJsonLd,
  websiteJsonLd
} from "@/lib/seo/structured-data";
import { JsonLd } from "./JsonLd";

export type SchemaGraph = Record<string, unknown> | null | undefined;

type StructuredDataProps = {
  data: SchemaGraph | SchemaGraph[];
};

/** Render one or many JSON-LD schema objects. */
export function StructuredData({ data }: StructuredDataProps) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean) as Record<string, unknown>[];
  if (!list.length) return null;
  return <JsonLd data={list.length === 1 ? list[0] : list} />;
}

export {
  aggregateRatingJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  plansOfferCatalogJsonLd,
  productJsonLd,
  reviewJsonLd,
  serviceJsonLd,
  webPageJsonLd,
  websiteJsonLd
};
