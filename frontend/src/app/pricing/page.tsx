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

export const metadata: Metadata = createPageMetadata({
  title: "أسعار IPTV المغرب — باقات SANAD IPTV",
  description:
    "باقات IPTV SANAD: 3 أشهر، 6 أشهر، وسنة كاملة. قنوات، أفلام، رياضة 4K، تفعيل فوري عبر واتساب.",
  path: "/pricing",
  keywords: "أسعار IPTV, abonnement IPTV Maroc, SANAD IPTV, IPTV 4K"
});

export default async function PricingPage() {
  const content = await getStoreContent();
  const plans = mergePlansWithCms(content.plans);

  const schemas = [
    webPageJsonLd({
      name: "أسعار IPTV SANAD",
      description: "باقات اشتراك IPTV في المغرب",
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
    ...plans.map((plan) => {
      const landingPath =
        plan.slug === "plan-3-months"
          ? "/iptv-3-months"
          : plan.slug === "plan-6-months"
            ? "/iptv-6-months"
            : "/iptv-12-months";
      return productJsonLd({
        name: plan.name.ar,
        description: plan.features.map((f) => f.ar).join(" • "),
        price: plan.price,
        currency: plan.currency,
        url: landingPath,
        brand: content.branding.brandName
      });
    })
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الأسعار" }
        ]}
        title="أسعار اشتراك IPTV"
        subtitle="اختر الباقة المناسبة ليك — تفعيل سريع، دعم واتساب، وجودة HD / 4K."
      >
        <div className="not-prose grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const price = formatPlanPrice(plan.price, "MAD", "ar-ma");
            const landingPath =
              plan.slug === "plan-3-months"
                ? "/iptv-3-months"
                : plan.slug === "plan-6-months"
                  ? "/iptv-6-months"
                  : "/iptv-12-months";
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
