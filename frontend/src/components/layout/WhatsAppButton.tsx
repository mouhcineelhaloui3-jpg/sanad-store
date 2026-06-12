"use client";

import { MessageCircle } from "lucide-react";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { whatsappUrl } from "@/lib/store-config";
import { trackWhatsAppClick } from "@/lib/analytics/track";

export function WhatsAppButton() {
  const { footer, homepage } = useStoreContent();
  if (!homepage.sections.whatsapp) return null;

  return (
    <a
      href={whatsappUrl(footer.whatsappMessage, footer.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      data-track="whatsapp_floating"
      onClick={() => trackWhatsAppClick("floating_button")}
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition hover:scale-105 md:bottom-8 md:left-8"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
