import Link from "next/link";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { PlanLandingCta } from "@/components/seo/PlanLandingCta";
import { SeoInternalLinks } from "@/components/seo/SeoInternalLinks";
import { StructuredData, faqJsonLd, productJsonLd, webPageJsonLd } from "@/components/seo/StructuredData";
import { getStoreContent } from "@/lib/cms/server";
import { mergePlansWithCms } from "@/lib/cms/merge-plans";
import { ProgrammaticPriceBadge } from "@/components/seo/ProgrammaticPriceBadge";
import type { ProgrammaticPage } from "@/lib/seo/programmatic-pages";
import { programmaticPages } from "@/lib/seo/programmatic-pages";

export async function ProgrammaticLandingPage({ page }: { page: ProgrammaticPage }) {
  const content = await getStoreContent();
  const plans = mergePlansWithCms(content.plans);
  const plan = page.planSlug ? plans.find((p) => p.slug === page.planSlug) : plans.find((p) => p.highlighted);
  const price = plan ? plan.price : null;
  const pagePath = `/iptv/${page.slug}`;

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: page.title, description: page.description, url: pagePath }),
          faqJsonLd(page.faqs),
          plan
            ? productJsonLd({
                name: plan.name.ar,
                description: page.description,
                price: plan.price,
                currency: plan.currency,
                url: pagePath,
                brand: content.branding.brandName
              })
            : null
        ]}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "IPTV", href: "/pricing" },
          { label: page.title }
        ]}
        title={page.title}
        subtitle={page.subtitle}
      >
        {price != null ? (
          <ProgrammaticPriceBadge amountMad={price} />
        ) : null}

        {page.contentBlocks?.length
          ? page.contentBlocks.map((block) => (
              <section key={block.heading}>
                <h2 className="text-2xl font-black text-white">{block.heading}</h2>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))
          : page.sections.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-black text-white">
            أسئلة شائعة — IPTV FAQ
          </h2>
          <dl className="mt-4 space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="glass-card rounded-2xl p-4">
                <dt className="font-black text-neon-cyan">{faq.question}</dt>
                <dd className="mt-2 text-white/80">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <PlanLandingCta planSlug={page.planSlug ?? "plan-6-months"} />

        <nav aria-label="صفحات ذات صلة" className="not-prose mt-8">
          <h2 className="text-lg font-black text-white">صفحات ذات صلة</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {page.relatedSlugs.map((slug) => {
              const related = programmaticPages[slug];
              if (!related) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/iptv/${slug}`}
                    className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-neon-cyan/40"
                  >
                    {related.title.split("—")[0]?.trim() ?? related.title}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/pricing" className="inline-block rounded-full border border-neon-gold/30 bg-neon-gold/10 px-4 py-2 text-sm font-semibold text-neon-gold">
                الأسعار
              </Link>
            </li>
            <li>
              <Link href="/trial" className="inline-block rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-2 text-sm font-semibold text-neon-green">
                تجربة مجانية
              </Link>
            </li>
          </ul>
        </nav>

        <SeoInternalLinks currentPath={pagePath} />
      </MarketingPageLayout>
    </>
  );
}
