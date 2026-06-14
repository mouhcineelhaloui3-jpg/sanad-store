import type { Metadata } from "next";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { SeoInternalLinks } from "@/components/seo/SeoInternalLinks";
import { StructuredData, productJsonLd, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { PricingPlansGrid } from "@/components/pricing/PricingPlansGrid";
import { getStoreContent } from "@/lib/cms/server";
import { mergePlansWithCms } from "@/lib/cms/merge-plans";
import { organizationJsonLd, plansOfferCatalogJsonLd } from "@/lib/seo/structured-data";
import { planLandingPath } from "@/lib/plan-routes";

export const metadata: Metadata = createPageMetadata({
  title: "Global IPTV Pricing — Premium IPTV Subscription | SANAD IPTV",
  description:
    "Premium IPTV subscription plans worldwide: 115,000+ channels, 120,000+ VOD, 4K sports streaming. Instant activation, 24/7 support. Prices in MAD, EUR, USD, GBP, CAD & AUD.",
  path: "/pricing",
  keywords:
    "IPTV subscription, premium IPTV, best IPTV service, IPTV streaming, IPTV worldwide, international IPTV, IPTV 4K streaming, global IPTV pricing"
});

export default async function PricingPage() {
  const content = await getStoreContent();
  const plans = mergePlansWithCms(content.plans);

  const schemas = [
    webPageJsonLd({
      name: "SANAD IPTV Global Pricing",
      description: "Premium IPTV subscription plans for customers worldwide",
      url: "/pricing"
    }),
    organizationJsonLd({
      name: content.branding.brandName,
      description: content.seo.description,
      email: content.footer.supportEmail,
      logoUrl: content.branding.logoUrl,
      whatsappNumber: content.footer.whatsappNumber,
      telegramUrl: content.footer.telegramUrl
    }),
    plansOfferCatalogJsonLd(plans, content.branding.brandName),
    ...plans.map((plan) =>
      productJsonLd({
        name: plan.name.en,
        description: plan.features.map((f) => f.en).join(" • "),
        price: plan.price,
        currency: plan.currency,
        url: planLandingPath(plan.slug),
        brand: content.branding.brandName
      })
    )
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing" }
        ]}
        title="Premium IPTV Subscription — Worldwide Pricing"
        subtitle="Choose your plan — 115,000+ international channels, 120,000+ movies & series, global sports, instant activation, and 24/7 WhatsApp support. Available worldwide."
      >
        <PricingPlansGrid plans={plans} />
        <PlanLandingCta />
        <SeoInternalLinks currentPath="/pricing" />
      </MarketingPageLayout>
    </>
  );
}
