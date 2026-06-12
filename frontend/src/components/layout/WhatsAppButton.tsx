"use client";

import { MessageCircle } from "lucide-react";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { whatsappUrl } from "@/lib/store-config";

export function WhatsAppButton() {
  const { footer, homepage } = useStoreContent();
  if (!homepage.sections.whatsapp) return null;

  return (
    <a
      href={whatsappUrl(footer.whatsappMessage, footer.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition hover:scale-105 md:bottom-8 md:left-8"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
    </a>
  );
}
