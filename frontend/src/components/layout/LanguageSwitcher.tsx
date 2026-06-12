"use client";

import { Globe } from "lucide-react";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { t, localizedNavLinks } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function LanguageSwitcher() {
  const locale = useLocaleStore((s) => s.locale);
  const toggle = useLocaleStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:border-neon-cyan/40 hover:bg-neon-cyan/10"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4 text-neon-cyan" />
      {locale === "ar" ? "EN" : "AR"}
    </button>
  );
}

export function useNavLinks() {
  const { header } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  return localizedNavLinks(header.navLinks, locale);
}

export function useSubscribeLabel() {
  const { header } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  return t(header.subscribeCtaLabel, locale);
}

export function usePromoBar() {
  const { header } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  return t(header.promoBar, locale);
}
