import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";

import { IptvContact } from "@/components/iptv/IptvContact";

import { IptvDeviceGrid } from "@/components/iptv/IptvDeviceGrid";

import { IptvFaq } from "@/components/iptv/IptvFaq";

import { IptvFeatures } from "@/components/iptv/IptvFeatures";

import { IptvHero } from "@/components/iptv/IptvHero";

import { IptvHowItWorks } from "@/components/iptv/IptvHowItWorks";

import { IptvLiveTicker } from "@/components/iptv/IptvLiveTicker";

import { IptvMoviesShowcase } from "@/components/iptv/IptvMoviesShowcase";

import { IptvPlans } from "@/components/iptv/IptvPlans";

import { IptvSportsShowcase } from "@/components/iptv/IptvSportsShowcase";

import { SectionDivider } from "@/components/iptv/SectionDivider";

import { IptvStats } from "@/components/iptv/IptvStats";

import { IptvTestimonials } from "@/components/iptv/IptvTestimonials";

import { IptvTrial } from "@/components/iptv/IptvTrial";

import { mergePlansWithCms } from "@/lib/cms/merge-plans";

import { getStoreContent } from "@/lib/cms/server";

import { buildPageMetadata } from "@/lib/seo/metadata";

import {

  aggregateRatingJsonLd,

  faqJsonLd,

  organizationJsonLd,

  plansOfferCatalogJsonLd,

  serviceJsonLd,

  webPageJsonLd,

  websiteJsonLd

} from "@/lib/seo/structured-data";



export async function generateMetadata(): Promise<Metadata> {

  const content = await getStoreContent();

  return buildPageMetadata({

    title: content.seo.title,

    description: content.seo.description,

    path: "/",

    ogImage: content.seo.ogImageUrl,

    ogTitle: content.seo.ogTitle,

    ogDescription: content.seo.ogDescription,

    keywords: content.seo.keywords

  });

}



export default async function HomePage() {

  const content = await getStoreContent();

  const { homepage, footer, branding, seo, layout } = content;

  const plans = mergePlansWithCms(content.plans);


  const { sections } = homepage;
  const showDivider = layout.showSectionDividers;

  const faqsForLd = homepage.faqs.map((f) => ({

    question: f.question.ar,

    answer: f.answer.ar

  }));



  const jsonLd = [

    organizationJsonLd({

      name: branding.brandName,

      description: footer.description.ar,

      email: footer.supportEmail,

      logoUrl: branding.logoUrl,

      whatsappNumber: footer.whatsappNumber,

      telegramUrl: footer.telegramUrl

    }),

    websiteJsonLd({ name: branding.brandName, description: seo.description }),

    webPageJsonLd({ name: seo.title, description: seo.description }),

    serviceJsonLd({

      name: `${branding.brandName} IPTV`,

      description: seo.description,

      provider: branding.brandName

    }),

    plansOfferCatalogJsonLd(plans, branding.brandName),

    aggregateRatingJsonLd(homepage.testimonials, branding.brandName),

    faqJsonLd(faqsForLd)

  ].filter(Boolean) as Record<string, unknown>[];



  return (

    <div className="relative min-h-screen pb-16 md:pb-0">

      <JsonLd data={jsonLd} />



      <IptvHero

        hero={homepage.hero}

        whatsappNumber={footer.whatsappNumber}

        whatsappMessage={footer.whatsappMessage}

      />



      {sections.liveTicker ? <IptvLiveTicker ticker={homepage.liveTicker} /> : null}



      {sections.sports ? <IptvSportsShowcase sports={homepage.sports} /> : null}

      {sections.sports && sections.movies && showDivider ? <SectionDivider /> : null}

      {sections.movies && homepage.movies ? (
        <IptvMoviesShowcase movies={homepage.movies} />
      ) : null}

      {sections.movies && sections.features && showDivider ? <SectionDivider /> : null}



      {sections.features ? (

        <IptvFeatures

          title={homepage.featuresTitle}

          subtitle={homepage.featuresSubtitle}

          features={homepage.features}

        />

      ) : null}



      {sections.plans ? (

        <IptvPlans title={homepage.plansTitle} subtitle={homepage.plansSubtitle} plans={plans} />

      ) : null}



      {sections.howItWorks ? <IptvHowItWorks section={homepage.howItWorks} /> : null}



      {sections.devices ? <IptvDeviceGrid section={homepage.devices} /> : null}



      {sections.trial ? <IptvTrial trial={homepage.trial} /> : null}



      {sections.testimonials ? (

        <IptvTestimonials

          title={homepage.testimonialsTitle}

          subtitle={homepage.testimonialsSubtitle}

          testimonials={homepage.testimonials}

        />

      ) : null}



      {sections.stats ? <IptvStats stats={homepage.stats} /> : null}



      {sections.faq ? (

        <IptvFaq title={homepage.faqTitle} subtitle={homepage.faqSubtitle} faqs={homepage.faqs} />

      ) : null}



      {sections.contact ? (

        <IptvContact

          contact={homepage.contact}

          email={footer.supportEmail}

          whatsappNumber={footer.whatsappNumber}

          whatsappMessage={footer.whatsappMessage}

          telegramUrl={footer.telegramUrl}

        />

      ) : null}

    </div>

  );

}


