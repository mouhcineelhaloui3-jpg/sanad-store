import type { Metadata } from "next";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { StructuredData, productJsonLd, webPageJsonLd } from "@/components/seo/StructuredData";
import { createLandingMetadata } from "@/components/seo/MetaTags";
import { getStoreContent } from "@/lib/cms/server";
import { mergePlansWithCms } from "@/lib/cms/merge-plans";
import { formatPlanPrice } from "@/lib/i18n/currency";
import type { Plan } from "@/lib/plans";

import type { PlanSlug } from "@/lib/plan-routes";

type PlanLandingConfig = {
  slug: PlanSlug;
  path: string;
  title: string;
  description: string;
  subtitle: string;
  bullets: string[];
};

export function buildPlanLandingMetadata(config: PlanLandingConfig): Metadata {
  return createLandingMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
    keywords: "IPTV Maroc, abonnement IPTV, SANAD IPTV, قنوات رياضية, 4K"
  });
}

export async function PlanLandingPage({ config }: { config: PlanLandingConfig }) {
  const content = await getStoreContent();
  const plans = mergePlansWithCms(content.plans);
  const plan = plans.find((p) => p.slug === config.slug) as Plan | undefined;
  const price = plan ? formatPlanPrice(plan.price, "MAD", "ar-ma").primary : null;

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: config.title, description: config.description, url: config.path }),
          plan
            ? productJsonLd({
                name: plan.name.ar,
                description: config.description,
                price: plan.price,
                currency: plan.currency,
                url: config.path,
                brand: content.branding.brandName
              })
            : null
        ]}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الأسعار", href: "/pricing" },
          { label: config.title }
        ]}
        title={config.title}
        subtitle={config.subtitle}
      >
        {price ? (
          <p className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-3 text-lg font-black text-neon-cyan">
            السعر: {price} — تفعيل فوري عبر واتساب
          </p>
        ) : null}
        <ul className="space-y-3">
          {config.bullets.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
        <PlanLandingCta planSlug={config.slug} />
      </MarketingPageLayout>
    </>
  );
}
