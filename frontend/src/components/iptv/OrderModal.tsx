"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence  } from "@/components/motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { DEVICE_OPTIONS } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { formatPlanPrice } from "@/lib/i18n/currency";
import { orderModalText } from "@/lib/i18n/modal-strings";
import { mergePlansWithCms } from "@/lib/cms/merge-plans";
import type { Plan } from "@/lib/plans";
import { buildOrderWhatsAppMessage, whatsappUrl } from "@/lib/store-config";
import { getTrackingPayload, trackLead } from "@/lib/analytics/track";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function OrderModal() {
  const { modal, selectedPlanSlug, close } = useIptvModalStore();
  const { plans: planOverrides, footer } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);
  const currency = useLocaleStore((s) => s.currency);
  const plans = mergePlansWithCms(planOverrides);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [device, setDevice] = useState("android");
  const [planSlug, setPlanSlug] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPlanSlug) setPlanSlug(selectedPlanSlug);
    else if (plans.length && !planSlug) setPlanSlug(plans[0].slug);
  }, [selectedPlanSlug, plans, planSlug]);

  const isOpen = modal === "order";
  const selectedPlan = plans.find((p) => p.slug === planSlug);

  const labels = {
    title: orderModalText("title", locale),
    name: orderModalText("name", locale),
    phone: orderModalText("phone", locale),
    device: orderModalText("device", locale),
    plan: orderModalText("plan", locale),
    notes: orderModalText("notes", locale),
    submit: orderModalText("submit", locale)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !planSlug) {
      toast.error(orderModalText("requiredError", locale));
      return;
    }

    setSubmitting(true);
    const deviceLabel = t(DEVICE_OPTIONS.find((d) => d.value === device)!.label, locale);
    const planLabel = selectedPlan ? t(selectedPlan.name, locale) : planSlug;

    try {
      await fetch("/api/subscription-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, device, planSlug, notes, tracking: getTrackingPayload() })
      });
      trackLead(planSlug, device);
    } catch {
      // continue to WhatsApp even if API fails
    }

    const message = buildOrderWhatsAppMessage({
      name,
      phone,
      device: deviceLabel,
      plan: planLabel,
      notes: notes || undefined
    });

    window.open(whatsappUrl(message, footer.whatsappNumber), "_blank");
    toast.success(orderModalText("success", locale));
    close();
    setName("");
    setPhone("");
    setNotes("");
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
        >
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-label="إغلاق"
          />
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-dark-50 p-6 shadow-glow"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 id="order-modal-title" className="text-xl font-black text-white">
                {labels.title}
              </h3>
              <button type="button" onClick={close} className="rounded-full p-2 text-dark-700 hover:text-white" aria-label="إغلاق">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label={labels.name}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="iptv-input"
                  required
                />
              </Field>
              <Field label={labels.phone}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="iptv-input"
                  placeholder="0612345678"
                  dir="ltr"
                  required
                />
              </Field>
              <Field label={labels.device}>
                <select value={device} onChange={(e) => setDevice(e.target.value)} className="iptv-input">
                  {DEVICE_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {t(d.label, locale)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={labels.plan}>
                <select value={planSlug} onChange={(e) => setPlanSlug(e.target.value)} className="iptv-input">
                  {plans.map((p: Plan) => {
                    const price = formatPlanPrice(p.price, currency, locale);
                    return (
                      <option key={p.slug} value={p.slug}>
                        {t(p.name, locale)} — {price.primary}
                      </option>
                    );
                  })}
                </select>
              </Field>
              <Field label={labels.notes}>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="iptv-input min-h-[80px] resize-none"
                  rows={3}
                />
              </Field>
              <button type="submit" disabled={submitting} className="btn-neon w-full">
                {submitting ? "..." : labels.submit}
              </button>
            </form>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-dark-800">{label}</span>
      {children}
    </label>
  );
}
