"use client";

import { Check, Minus } from "lucide-react";
import { t, type LocalizedText } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

type CompareCell = LocalizedText;

const title: LocalizedText = {
  ar: "لماذا SANAD IPTV أفضل؟",
  en: "Why SANAD IPTV Is Better?"
};

const headers = {
  features: { ar: "المميزات", en: "Features" },
  sanad: { ar: "SANAD IPTV", en: "SANAD IPTV" },
  others: { ar: "مزودون آخرون", en: "Other Providers" }
};

const yes: LocalizedText = { ar: "نعم", en: "Yes" };
const limited: LocalizedText = { ar: "محدود", en: "Limited" };
const sometimes: LocalizedText = { ar: "أحياناً", en: "Sometimes" };
const no: LocalizedText = { ar: "لا", en: "No" };
const average: LocalizedText = { ar: "متوسط", en: "Average" };

const rows: { feature: LocalizedText; sanad: CompareCell; others: CompareCell; sanadPositive: boolean }[] = [
  {
    feature: { ar: "جودة 4K", en: "4K Quality" },
    sanad: yes,
    others: limited,
    sanadPositive: true
  },
  {
    feature: { ar: "دعم 24/7", en: "24/7 Support" },
    sanad: yes,
    others: sometimes,
    sanadPositive: true
  },
  {
    feature: { ar: "تفعيل سريع", en: "Fast Activation" },
    sanad: yes,
    others: no,
    sanadPositive: true
  },
  {
    feature: { ar: "120,000+ فيلم ومسلسل", en: "120,000+ Movies" },
    sanad: yes,
    others: limited,
    sanadPositive: true
  },
  {
    feature: { ar: "25,000+ قناة", en: "25,000+ Channels" },
    sanad: yes,
    others: limited,
    sanadPositive: true
  },
  {
    feature: { ar: "خوادم مستقرة", en: "Stable Servers" },
    sanad: yes,
    others: average,
    sanadPositive: true
  }
];

function CellValue({ value, positive }: { value: LocalizedText; positive?: boolean }) {
  const locale = useLocaleStore((s) => s.locale);
  const text = t(value, locale);
  const isYes = text === t(yes, locale);

  return (
    <span className="inline-flex items-center justify-center gap-1.5">
      {isYes ? (
        <Check className="h-4 w-4 shrink-0 text-neon-green" aria-hidden="true" />
      ) : (
        <Minus className="h-4 w-4 shrink-0 text-white/35" aria-hidden="true" />
      )}
      <span className={positive && isYes ? "font-bold text-neon-cyan" : "text-white/65"}>{text}</span>
    </span>
  );
}

export function IptvComparison() {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <section className="iptv-section-spacing px-4" aria-labelledby="comparison-title">
      <div className="mx-auto max-w-4xl">
        <h2 id="comparison-title" className="section-title text-center">
          {t(title, locale)}
        </h2>

        <div className="compare-table-wrap mt-10 overflow-hidden rounded-2xl border border-neon-cyan/20 bg-white/[0.03] shadow-glow backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="compare-table w-full min-w-[320px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-neon-cyan/5">
                  <th className="px-4 py-4 text-start text-xs font-black uppercase tracking-wider text-white/70 sm:px-6">
                    {t(headers.features, locale)}
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-neon-cyan sm:px-6">
                    {t(headers.sanad, locale)}
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-white/50 sm:px-6">
                    {t(headers.others, locale)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature.ar}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                      i % 2 === 0 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <td className="px-4 py-4 font-bold text-white sm:px-6">{t(row.feature, locale)}</td>
                    <td className="px-4 py-4 text-center sm:px-6">
                      <CellValue value={row.sanad} positive={row.sanadPositive} />
                    </td>
                    <td className="px-4 py-4 text-center sm:px-6">
                      <CellValue value={row.others} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
