import type { Product } from "@/lib/products";
import { absoluteUrl } from "./metadata";

export function organizationJsonLd(options: {
  name: string;
  description: string;
  email: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options.name,
    description: options.description,
    url: options.url ?? absoluteUrl("/"),
    email: options.email,
    areaServed: "MA",
    inLanguage: "ar"
  };
}

export function websiteJsonLd(options: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name,
    description: options.description,
    url: absoluteUrl("/"),
    inLanguage: "ar-MA",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/collection")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function productJsonLd(product: Product, imageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nameAr,
    description: product.subheadline,
    image: imageUrl ? absoluteUrl(imageUrl) : absoluteUrl("/opengraph-image"),
    sku: product.id,
    brand: { "@type": "Brand", name: "سَنَد" },
    aggregateRating:
      product.ratingCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.ratingValue,
            reviewCount: product.ratingCount,
            bestRating: 5,
            worstRating: 1
          }
        : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/product/${product.slug}`),
      seller: { "@type": "Organization", name: "سَنَد" }
    }
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
