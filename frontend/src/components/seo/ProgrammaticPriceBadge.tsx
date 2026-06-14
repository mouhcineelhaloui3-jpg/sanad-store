"use client";

import { formatPlanPrice } from "@/lib/i18n/currency";
import { useLocaleStore } from "@/store/localeStore";

export function ProgrammaticPriceBadge({ amountMad, suffix }: { amountMad: number; suffix?: string }) {
  const locale = useLocaleStore((s) => s.locale);
  const currency = useLocaleStore((s) => s.currency);
  const price = formatPlanPrice(amountMad, currency, locale);
  const suffixText =
    suffix ?? (locale === "en" ? "Instant activation via WhatsApp" : "تفعيل فوري عبر واتساب");

  return (
    <p className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-3 text-lg font-black text-neon-cyan">
      {locale === "en" ? "From" : "من"} {price.primary}
      {price.madNote ? <span className="mt-1 block text-sm font-semibold text-neon-cyan/80">{price.madNote}</span> : null}
      {" — "}
      {suffixText}
    </p>
  );
}
