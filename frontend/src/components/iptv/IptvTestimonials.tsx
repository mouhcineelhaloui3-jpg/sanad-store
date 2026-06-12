"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/cms/types";
import type { LocalizedText } from "@/lib/i18n/localized";
import { t } from "@/lib/i18n/localized";
import { useLocaleStore } from "@/store/localeStore";

export function IptvTestimonials({
  title,
  subtitle,
  testimonials
}: {
  title: LocalizedText;
  subtitle: LocalizedText;
  testimonials: Testimonial[];
}) {
  const locale = useLocaleStore((s) => s.locale);
  const visible = testimonials.filter((t) => t.visible);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % visible.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [visible.length]);

  if (visible.length === 0) return null;

  const current = visible[index];

  return (
    <section id="testimonials" className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="section-eyebrow">{t(title, locale)}</p>
          <h2 className="section-title mt-2">{t(title, locale)}</h2>
          <p className="section-subtitle mx-auto">{t(subtitle, locale)}</p>
        </div>

        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-10"
            >
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-neon-gold text-neon-gold" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-9 text-dark-800">&ldquo;{t(current.comment, locale)}&rdquo;</p>
              <p className="mt-6 font-black text-neon-cyan">{t(current.name, locale)}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + visible.length) % visible.length)}
              className="rounded-full border border-white/10 p-2 text-white transition hover:border-neon-cyan/50"
              aria-label="Previous"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {visible.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-neon-cyan" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % visible.length)}
              className="rounded-full border border-white/10 p-2 text-white transition hover:border-neon-cyan/50"
              aria-label="Next"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
