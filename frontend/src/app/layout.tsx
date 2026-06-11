import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${latin.variable}`}>
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
