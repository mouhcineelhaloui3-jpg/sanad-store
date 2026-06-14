import type { Testimonial } from "@/lib/cms/types";
import type { Plan } from "@/lib/plans";
import { absoluteUrl } from "./metadata";

export function organizationJsonLd(options: {
  name: string;
  description: string;
  email: string;
  logoUrl?: string;
  whatsappNumber?: string;
  telegramUrl?: string;
}) {
  const sameAs = [options.telegramUrl].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options.name,
    description: options.description,
    url: absoluteUrl("/"),
    email: options.email,
    logo: options.logoUrl ? absoluteUrl(options.logoUrl) : absoluteUrl("/opengraph-image"),
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      { "@type": "Country", name: "Europe" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Middle East" },
      { "@type": "Country", name: "Africa" }
    ],
    inLanguage: ["ar", "en"],
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Arabic", "English"],
      ...(options.whatsappNumber
        ? { telephone: `+${options.whatsappNumber.replace(/\D/g, "")}` }
        : {})
    }
  };
}

export function websiteJsonLd(options: { name: string; description: string; searchUrl?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name,
    description: options.description,
    url: absoluteUrl("/"),
    inLanguage: ["ar-MA", "en"],
    publisher: { "@type": "Organization", name: options.name },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl(options.searchUrl ?? "/api/search?q={search_term_string}")
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function webPageJsonLd(options: {
  name: string;
  description: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: options.url ?? absoluteUrl("/"),
    inLanguage: "ar-MA",
    isPartOf: { "@type": "WebSite", url: absoluteUrl("/") }
  };
}

export function serviceJsonLd(options: {
  name: string;
  description: string;
  provider: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    provider: { "@type": "Organization", name: options.provider },
    serviceType: "IPTV Subscription",
    areaServed: { "@type": "Place", name: "Worldwide" },
    url: absoluteUrl("/")
  };
}

export function plansOfferCatalogJsonLd(plans: Plan[], brandName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${brandName} — Subscription Plans`,
    itemListElement: plans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: plan.name.ar,
        description: plan.features.map((f) => f.ar).join(" • "),
        price: plan.price,
        priceCurrency: plan.currency,
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/#plans"),
        seller: { "@type": "Organization", name: brandName },
        eligibleDuration: plan.duration.ar
      }
    }))
  };
}

export function productJsonLd(options: {
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
  brand: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    brand: { "@type": "Brand", name: options.brand },
    offers: {
      "@type": "Offer",
      price: options.price,
      priceCurrency: options.currency,
      availability: "https://schema.org/InStock",
      url: options.url
    }
  };
}

export function reviewJsonLd(options: {
  itemName: string;
  author: string;
  rating: number;
  reviewBody: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Product", name: options.itemName },
    author: { "@type": "Person", name: options.author },
    reviewRating: { "@type": "Rating", ratingValue: options.rating, bestRating: 5 },
    reviewBody: options.reviewBody
  };
}

export function aggregateRatingJsonLd(testimonials: Testimonial[], brandName: string) {
  const visible = testimonials.filter((t) => t.visible);
  if (!visible.length) return null;

  const avg = visible.reduce((sum, t) => sum + t.rating, 0) / visible.length;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brandName} IPTV Subscription`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: visible.length,
      bestRating: 5,
      worstRating: 1
    },
    review: visible.slice(0, 5).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name.ar },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.comment.ar
    }))
  };
}

export function faqJsonLd(faqs: ReadonlyArray<{ question: string; answer: string }>) {
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

export function articleJsonLd(options: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  author?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: absoluteUrl(options.url),
    datePublished: options.publishedAt,
    dateModified: options.publishedAt,
    inLanguage: "ar-MA",
    author: { "@type": "Organization", name: options.author ?? "SANAD IPTV" },
    publisher: {
      "@type": "Organization",
      name: options.author ?? "SANAD IPTV",
      logo: { "@type": "ImageObject", url: absoluteUrl("/opengraph-image") }
    },
    ...(options.imageUrl ? { image: absoluteUrl(options.imageUrl) } : { image: absoluteUrl("/opengraph-image") }),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(options.url) }
  };
}
