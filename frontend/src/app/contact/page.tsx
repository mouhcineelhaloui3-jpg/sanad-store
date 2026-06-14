import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { StructuredData, webPageJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/components/seo/MetaTags";
import { getStoreContent } from "@/lib/cms/server";
import { organizationJsonLd } from "@/lib/seo/structured-data";
import { whatsappUrl } from "@/lib/store-config";

export const metadata: Metadata = createPageMetadata({
  title: "تواصل مع SANAD IPTV — واتساب ودعم",
  description: "تواصل مع فريق SANAD IPTV عبر واتساب أو تيليغرام. دعم سريع للاشتراك والتجربة المجانية.",
  path: "/contact",
  keywords: "SANAD IPTV contact, WhatsApp IPTV support, global IPTV"
});

export default async function ContactPage() {
  const content = await getStoreContent();
  const { footer } = content;
  const wa = whatsappUrl(footer.whatsappMessage, footer.whatsappNumber);

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "تواصل SANAD IPTV",
            description: metadata.description as string,
            url: "/contact"
          }),
          organizationJsonLd({
            name: content.branding.brandName,
            description: content.seo.description,
            email: footer.supportEmail,
            logoUrl: content.branding.logoUrl,
            whatsappNumber: footer.whatsappNumber,
            telegramUrl: footer.telegramUrl
          })
        ]}
      />
      <MarketingPageLayout
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل" }
        ]}
        title="تواصل معنا"
        subtitle="فريق الدعم جاهز يساعدك فالتجربة، الاشتراك، والتثبيت."
      >
        <div className="not-prose grid gap-4 sm:grid-cols-2">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="glass-card block rounded-2xl p-6 hover:ring-2 hover:ring-neon-green">
            <p className="text-lg font-black text-neon-green">💬 WhatsApp</p>
            <p className="mt-2 text-sm text-white/70">رد سريع — اشتراك وتجربة مجانية</p>
          </a>
          {footer.telegramUrl ? (
            <a href={footer.telegramUrl} target="_blank" rel="noopener noreferrer" className="glass-card block rounded-2xl p-6 hover:ring-2 hover:ring-neon-cyan">
              <p className="text-lg font-black text-neon-cyan">Telegram</p>
              <p className="mt-2 text-sm text-white/70">@SANADIPTV</p>
            </a>
          ) : null}
        </div>
        <p>
          Email: <Link href={`mailto:${footer.supportEmail}`}>{footer.supportEmail}</Link>
        </p>
        <Link href="/trial" className="btn-gold inline-block">
          بغيت نجرب مجاناً
        </Link>
      </MarketingPageLayout>
    </>
  );
}
