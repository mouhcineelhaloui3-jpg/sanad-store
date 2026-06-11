import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic"
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin"
});

export const metadata: Metadata = {
  title: "سَنَد | دعم ذكي لجسمك في الأيام الطويلة",
  description: "متجر مغربي متخصص في حلول دعم وراحة الظهر، الرقبة، والكتفين بالدفع عند الاستلام."
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
