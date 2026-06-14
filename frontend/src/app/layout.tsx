import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { DeferredAnalytics } from "@/components/analytics/DeferredAnalytics";
import { StoreContentProvider } from "@/components/cms/StoreContentProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getStoreContent } from "@/lib/cms/server";
import { layoutCssVars } from "@/lib/cms/layout-styles";
import { buildRootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["700"],
  variable: "--font-arabic",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Tahoma", "Arial", "sans-serif"]
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
  preload: false,
  adjustFontFallback: true
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStoreContent();
  return buildRootMetadata(content.seo, content.branding);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getStoreContent();
  const layoutVars = layoutCssVars(content.layout);

  return (
    <html lang="ar-MA" dir="rtl" className={`${arabic.variable} ${latin.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname.indexOf('/admin')===0){document.documentElement.dataset.theme='dark';document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';return;}var r=localStorage.getItem('sanad-theme');if(!r)return;var j=JSON.parse(r);var t=j&&j.state&&j.state.theme;if(t==='light'){document.documentElement.dataset.theme='light';document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`
          }}
        />
      </head>
      <body
        className="font-sans text-white antialiased site-body"
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
        <DeferredAnalytics />
        <StoreContentProvider content={content}>
          <SiteChrome>{children}</SiteChrome>
        </StoreContentProvider>
      </body>
    </html>
  );
}
