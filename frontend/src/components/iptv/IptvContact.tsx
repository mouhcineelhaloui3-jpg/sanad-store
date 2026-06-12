"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import type { ContactSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { whatsappUrl } from "@/lib/store-config";
import { useLocaleStore } from "@/store/localeStore";

export function IptvContact({
  contact,
  email,
  whatsappNumber,
  whatsappMessage,
  telegramUrl
}: {
  contact: ContactSection;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  telegramUrl: string;
}) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section id="contact" className="px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">{t(contact.title, locale)}</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappUrl(whatsappMessage, whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp min-w-[180px]"
          >
            <MessageCircle className="h-5 w-5" />
            {t(contact.whatsappLabel, locale)}
          </a>
          <a href={`mailto:${email}`} className="btn-neon-outline min-w-[180px]">
            <Mail className="h-5 w-5" />
            {t(contact.emailLabel, locale)}
          </a>
          {telegramUrl ? (
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-outline min-w-[180px]"
            >
              <Send className="h-5 w-5" />
              {t(contact.telegramLabel, locale)}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
