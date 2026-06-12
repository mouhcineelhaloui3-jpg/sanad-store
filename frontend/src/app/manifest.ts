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
    lang: "ar",
    dir: "rtl",
    categories: ["entertainment", "shopping"],
    icons: [
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
