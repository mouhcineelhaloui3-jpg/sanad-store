export const storeConfig = {
  brand: "SANAD IPTV",
  tagline: "تفرج بلا حدود",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000",
  whatsappMessage: "السلام، بغيت نستافسر على SANAD IPTV.",
  supportEmail: "support@sanadiptv.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanadiptv.com"
} as const;

export function whatsappUrl(
  message: string = storeConfig.whatsappMessage,
  phoneNumber: string = storeConfig.whatsappNumber
) {
  const phone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppMessage(params: {
  name: string;
  phone: string;
  device: string;
  plan: string;
  notes?: string;
}) {
  const lines = [
    "🔥 *طلب اشتراك SANAD IPTV*",
    "",
    `👤 الاسم: ${params.name}`,
    `📱 واتساب: ${params.phone}`,
    `📺 الجهاز: ${params.device}`,
    `📦 الباقة: ${params.plan}`,
    params.notes ? `📝 ملاحظات: ${params.notes}` : ""
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildTrialWhatsAppMessage(params: {
  name: string;
  phone: string;
  device: string;
  message?: string;
}) {
  const lines = [
    "🎁 *طلب تجربة مجانية SANAD IPTV*",
    "",
    `👤 الاسم: ${params.name}`,
    `📱 واتساب: ${params.phone}`,
    `📺 الجهاز: ${params.device}`,
    params.message ? `💬 رسالة: ${params.message}` : ""
  ].filter(Boolean);
  return lines.join("\n");
}
