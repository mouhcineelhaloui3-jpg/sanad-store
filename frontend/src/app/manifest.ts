import type { MetadataRoute } from "next";
import { getStoreContent } from "@/lib/cms/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const content = await getStoreContent();

  return {
    name: content.branding.brandName,
    short_name: "SANAD IPTV",
    description: content.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: content.branding.primaryColor,
    lang: "ar-MA",
    dir: "rtl",
    categories: ["entertainment", "shopping"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      },
      {
        src: content.branding.logoUrl || "/logo/sanad-iptv-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
