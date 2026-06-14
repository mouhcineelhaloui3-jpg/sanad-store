"use client";

import type { ReactNode } from "react";
import { MarketingPageLayout } from "@/components/seo/MarketingPageLayout";
import { blogUiText } from "@/lib/blog/ui-strings";
import { t, type LocalizedText } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function BlogPageShell({
  children,
  title,
  subtitle
}: {
  children: ReactNode;
  title?: LocalizedText;
  subtitle?: LocalizedText;
}) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <MarketingPageLayout
      breadcrumbs={[
        { label: blogUiText("home", locale), href: "/" },
        ...(title
          ? [
              { label: blogUiText("blog", locale), href: "/blog" },
              { label: t(title, locale) }
            ]
          : [{ label: blogUiText("blog", locale) }])
      ]}
      title={title ? t(title, locale) : blogUiText("pageTitle", locale)}
      subtitle={subtitle ? t(subtitle, locale) : blogUiText("pageSubtitle", locale)}
    >
      {children}
    </MarketingPageLayout>
  );
}
