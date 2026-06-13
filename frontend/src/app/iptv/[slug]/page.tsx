import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticLandingPage } from "@/components/seo/ProgrammaticLandingPage";
import { createLandingMetadata } from "@/components/seo/MetaTags";
import { programmaticPages, programmaticSlugs } from "@/lib/seo/programmatic-pages";

export const revalidate = 3600;

export function generateStaticParams() {
  return programmaticSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = programmaticPages[slug];
  if (!page) return {};
  return createLandingMetadata({
    title: page.title,
    description: page.description,
    path: `/iptv/${page.slug}`,
    keywords: page.keywords
  });
}

export default async function ProgrammaticSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = programmaticPages[slug];
  if (!page) notFound();
  return <ProgrammaticLandingPage page={page} />;
}
