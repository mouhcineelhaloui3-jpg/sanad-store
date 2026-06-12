"use client";

import Link from "next/link";
import { LockKeyhole, MessageCircle } from "lucide-react";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { t, localizedNavLinks } from "@/lib/i18n/localized";
import { whatsappUrl } from "@/lib/store-config";
import { useLocaleStore } from "@/store/localeStore";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  const { footer, branding } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  const storeLinks = localizedNavLinks(footer.storeLinks, locale);
  const policyLinks = localizedNavLinks(footer.policyLinks, locale);

  return (
    <footer className="border-t border-white/5 bg-dark-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-7 text-dark-800">{t(footer.description, locale)}</p>
          <a
            href={whatsappUrl(footer.whatsappMessage, footer.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-5"
          >
            <MessageCircle className="h-4 w-4" />
            {locale === "ar" ? "تواصل عبر واتساب" : "WhatsApp"}
          </a>
        </div>
        <div>
          <h3 className="font-bold text-white">{locale === "ar" ? "روابط سريعة" : "Quick Links"}</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-dark-800">
            {storeLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-neon-cyan">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">{locale === "ar" ? "السياسات" : "Policies"}</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-dark-800">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-neon-cyan">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-dark-700 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {branding.brandName}. {t(footer.copyright, locale)}
          </p>
          <p>{footer.supportEmail}</p>
          <Link
            href="/admin"
            aria-label="Admin"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-dark-600 transition hover:bg-white/5 hover:text-white"
          >
            <LockKeyhole className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
