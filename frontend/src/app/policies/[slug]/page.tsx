import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getStoreContent } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

const policies: Record<string, { title: string; description: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "How SANAD IPTV collects and uses your information: name, WhatsApp, device type, and technical data for security and service delivery worldwide.",
    body: [
      "We collect only the information required to activate your IPTV subscription and support you: full name, WhatsApp number, device type, and requested plan duration.",
      "We also collect limited technical data (IP address, browser type) to protect the site from fraudulent requests and improve performance.",
      "We do not sell your data to third parties. Information is used solely for subscription activation, technical support, and service improvement.",
      "You may request deletion or correction of your data by contacting us via WhatsApp or email at any time."
    ]
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "SANAD IPTV terms of use: subscriptions, payment, activation, technical support, and user responsibilities for customers worldwide.",
    body: [
      "SANAD IPTV provides paid IPTV streaming subscriptions. Prices are shown in MAD by default and may be displayed in EUR, USD, GBP, CAD, or AUD based on your region. Prices may change with notice.",
      "After placing an order, we contact you via WhatsApp to confirm payment and send activation credentials (M3U / Xtream codes). Activation is typically instant.",
      "You are responsible for using the service lawfully and keeping your login credentials secure.",
      "The service is not a replacement for official broadcaster subscriptions. We provide internet-based streaming with technical support.",
      "Subscriptions may be suspended in cases of abuse or violation of these terms."
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) return { title: "Policy not found", robots: { index: false } };

  const content = await getStoreContent();
  return buildPageMetadata({
    title: policy.title,
    description: policy.description,
    path: `/policies/${slug}`,
    ogImage: content.seo.ogImageUrl,
    ogTitle: policy.title,
    keywords: content.seo.keywords
  });
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();

  const content = await getStoreContent();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: content.branding.brandName, path: "/" },
            { name: policy.title, path: `/policies/${slug}` }
          ])
        ]}
      />
      <p className="section-eyebrow">{content.branding.brandName}</p>
      <h1 className="section-title mt-2">{policy.title}</h1>
      <div className="mt-8 space-y-5 glass-card p-6 leading-9 text-dark-800 md:p-8">
        {policy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link href="/" className="mt-8 inline-block text-sm font-bold text-neon-cyan hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
