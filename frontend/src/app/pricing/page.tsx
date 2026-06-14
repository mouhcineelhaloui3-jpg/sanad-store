import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { SeoInternalLinks } from "@/components/seo/SeoInternalLinks";
import { StructuredData, productJsonLd, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { getStoreContent } from "@/lib/cms/server";
import { mergePlansWithCms } from "@/lib/cms/merge-plans";
import { organizationJsonLd, plansOfferCatalogJsonLd } from "@/lib/seo/structured-data";
import { formatPlanPrice } from "@/lib/i18n/currency";
import { planLandingPath } from "@/lib/plan-routes";

export const metadata: Metadata = createPageMetadata({
  title: "Global IPTV Pricing — SANAD IPTV Plans | +115,000 Channels",
  description:
    "SANAD IPTV plans: Starter 3 months, Confort 6 months, Premium 12 months. +115,000 channels, 120,000+ VOD, 4K sports, instant activation via WhatsApp worldwide.",
  path: "/pricing",
  keywords: "IPTV pricing, IPTV subscription, SANAD IPTV, IPTV 4K, global IPTV"
});

export default async function PricingPage() {
  const content = await getStoreContent();
  const plans = mergePlansWithCms(content.plans);

  const schemas = [
    webPageJsonLd({
      name: "SANAD IPTV Global Pricing",
      description: "IPTV subscription plans for customers worldwide",
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
        name: plan.name.ar,
        description: plan.features.map((f) => f.ar).join(" • "),
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
          { label: "الرئيسية", href: "/" },
          { label: "الأسعار" }
        ]}
        title="Global IPTV Subscription Pricing"
        subtitle="Choose your IPTV plan — +115,000 channels, 120,000+ VOD, fast activation, 24/7 WhatsApp support, HD / 4K quality worldwide."
      >
        <div className="not-prose grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const price = formatPlanPrice(plan.price, "MAD", "ar-ma");
            const landingPath = planLandingPath(plan.slug);
            return (
              <div
                key={plan.slug}
                className={`glass-card rounded-2xl p-6 ${plan.highlighted ? "ring-2 ring-neon-cyan" : ""}`}
              >
                <h2 className="text-xl font-black text-white">{plan.name.ar}</h2>
                <p className="mt-2 text-3xl font-black text-neon-cyan">{price.primary}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {plan.features.map((f) => (
                    <li key={f.ar}>✓ {f.ar}</li>
                  ))}
                </ul>
                <Link href={landingPath} className="btn-neon mt-6 inline-block w-full text-center">
                  التفاصيل
                </Link>
              </div>
            );
          })}
        </div>
        <PlanLandingCta />
        <SeoInternalLinks currentPath="/pricing" />
      </MarketingPageLayout>
    </>
  );
}
