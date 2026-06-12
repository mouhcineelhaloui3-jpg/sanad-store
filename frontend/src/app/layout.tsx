import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { StoreContentProvider } from "@/components/cms/StoreContentProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getStoreContent } from "@/lib/cms/server";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap"
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "سَنَد | دعم ذكي لجسمك في الأيام الطويلة",
    template: "%s | سَنَد"
  },
  description: "متجر مغربي متخصص في حلول دعم وراحة الظهر، الرقبة، والكتفين. الدفع عند الاستلام داخل المغرب.",
  keywords: ["دعم الظهر", "مصحح الوضعية", "وسادة رقبة", "حزام ظهر", "المغرب", "COD"],
  openGraph: {
    title: "سَنَد | دعم ذكي لجسمك",
    description: "دعم الظهر والرقبة بالدفع عند الاستلام داخل المغرب.",
    locale: "ar_MA",
    type: "website"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getStoreContent();

  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${latin.variable}`}>
      <body className="font-sans" style={{ "--brand-primary": content.branding.primaryColor, "--brand-accent": content.branding.accentColor } as React.CSSProperties}>
        <StoreContentProvider content={content}>
          <SiteChrome>{children}</SiteChrome>
        </StoreContentProvider>
      </body>
    </html>
  );
}
