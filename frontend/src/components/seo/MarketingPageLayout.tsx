import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

export function MarketingPageLayout({
  breadcrumbs,
  title,
  subtitle,
  children
}: {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <Breadcrumbs items={breadcrumbs} />
      <header>
        <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-3xl text-base leading-8 text-white/80 md:text-lg">{subtitle}</p> : null}
      </header>
      <div className="prose-invert mt-10 space-y-5 text-base leading-8 text-white/90">{children}</div>
    </article>
  );
}
