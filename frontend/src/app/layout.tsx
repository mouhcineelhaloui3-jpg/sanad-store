import type { Metadata } from "next";
import { Suspense } from "react";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { ErrorReporter } from "@/components/analytics/ErrorReporter";
import { StoreContentProvider } from "@/components/cms/StoreContentProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getStoreContent } from "@/lib/cms/server";
import { layoutCssVars } from "@/lib/cms/layout-styles";
import { buildRootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: true
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStoreContent();
  return buildRootMetadata(content.seo, content.branding);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getStoreContent();
  const layoutVars = layoutCssVars(content.layout);

  return (
    <html lang="ar-MA" dir="rtl" className={`${arabic.variable} ${latin.variable}`}>
      <body
        className="font-sans text-white antialiased"
        style={
          {
            ...layoutVars,
            "--brand-primary": content.branding.primaryColor,
            "--brand-secondary": content.branding.secondaryColor,
            "--brand-accent": content.branding.accentColor
          } as React.CSSProperties
        }
      >
        <AnalyticsScripts integrations={content.integrations} />
        <ErrorReporter />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <StoreContentProvider content={content}>
          <SiteChrome>{children}</SiteChrome>
        </StoreContentProvider>
      </body>
    </html>
  );
}
