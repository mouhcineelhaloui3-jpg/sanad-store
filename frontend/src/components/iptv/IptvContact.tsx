"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import type { ContactSection } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { whatsappUrl } from "@/lib/store-config";
import { useLocaleStore } from "@/store/localeStore";

function formatPhoneDisplay(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.startsWith("212") && digits.length >= 12) {
    const local = digits.slice(3, 12);
    return `+212 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  return digits ? `+${digits}` : number;
}

function telegramHandle(url: string) {
  const match = url.match(/t\.me\/([^/?#]+)/i);
  return match ? `@${match[1]}` : "@SANADIPTV";
}

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
    <section id="contact" className="iptv-section-spacing px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">{t(contact.title, locale)}</h2>
        <div className="mt-6 space-y-2">
          <p className="text-lg font-black text-white md:text-xl">{formatPhoneDisplay(whatsappNumber)}</p>
          {telegramUrl ? (
            <p className="text-base font-bold text-neon-cyan md:text-lg">{telegramHandle(telegramUrl)}</p>
          ) : null}
        </div>
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
          <a href={`mailto:${email}`} className="btn-neon-outline min-w-[180px] text-white">
            <Mail className="h-5 w-5" />
            {t(contact.emailLabel, locale)}
          </a>
          {telegramUrl ? (
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-outline min-w-[180px] text-white"
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
