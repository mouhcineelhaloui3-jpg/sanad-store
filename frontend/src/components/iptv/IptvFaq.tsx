"use client";

import { useState } from "react";
import { m, AnimatePresence  } from "@/components/motion";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/cms/types";
import type { LocalizedText } from "@/lib/i18n/localized";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function IptvFaq({
  title,
  subtitle,
  faqs
}: {
  title: LocalizedText;
  subtitle: LocalizedText;
  faqs: Faq[];
}) {
  const locale = useLocaleStore((s) => s.locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="iptv-section-spacing px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="section-eyebrow">{t(title, locale)}</p>
          <h2 className="section-title mt-2">{t(subtitle, locale)}</h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question.ar} className="glass-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-black text-white">{t(faq.question, locale)}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-neon-cyan transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen ? (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-white/5 px-5 pb-5 pt-3 leading-8 text-dark-800">
                        {t(faq.answer, locale)}
                      </p>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
