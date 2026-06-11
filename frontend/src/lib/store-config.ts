export const storeConfig = {
  brand: "سَنَد",
  tagline: "دعم ذكي لجسمك في الأيام الطويلة",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000",
  whatsappMessage: "السلام، بغيت نستافسر على منتجات سَنَد.",
  supportEmail: "support@sanad.ma",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanad.ma"
} as const;

export function whatsappUrl(message = storeConfig.whatsappMessage) {
  const phone = storeConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
