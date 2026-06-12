"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { DEVICE_OPTIONS } from "@/lib/cms/types";
import { t } from "@/lib/i18n/localized";
import { trialModalText } from "@/lib/i18n/modal-strings";
import { buildTrialWhatsAppMessage, whatsappUrl } from "@/lib/store-config";
import { useStoreContent } from "@/components/cms/StoreContentProvider";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function TrialModal() {
  const { modal, close } = useIptvModalStore();
  const { footer } = useStoreContent();
  const locale = useLocaleStore((s) => s.locale);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [device, setDevice] = useState("android");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isOpen = modal === "trial";

  const labels = {
    title: trialModalText("title", locale),
    name: trialModalText("name", locale),
    phone: trialModalText("phone", locale),
    device: trialModalText("device", locale),
    message: trialModalText("message", locale),
    submit: trialModalText("submit", locale)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error(trialModalText("requiredError", locale));
      return;
    }

    setSubmitting(true);
    const deviceLabel = t(DEVICE_OPTIONS.find((d) => d.value === device)!.label, locale);

    try {
      await fetch("/api/trial-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, device, message })
      });
    } catch {
      // continue to WhatsApp
    }

    const waMessage = buildTrialWhatsAppMessage({
      name,
      phone,
      device: deviceLabel,
      message: message || undefined
    });

    window.open(whatsappUrl(waMessage, footer.whatsappNumber), "_blank");
    toast.success(trialModalText("success", locale));
    close();
    setName("");
    setPhone("");
    setMessage("");
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-label="Close"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative w-full max-w-md rounded-2xl border border-neon-green/30 bg-dark-50 p-6 shadow-glow-green"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{labels.title}</h3>
              <button type="button" onClick={close} className="rounded-full p-2 text-dark-700 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-dark-800">{labels.name}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="iptv-input" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-dark-800">{labels.phone}</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="iptv-input"
                  placeholder="0612345678"
                  dir="ltr"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-dark-800">{labels.device}</span>
                <select value={device} onChange={(e) => setDevice(e.target.value)} className="iptv-input">
                  {DEVICE_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {t(d.label, locale)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-dark-800">{labels.message}</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="iptv-input min-h-[80px] resize-none"
                  rows={3}
                />
              </label>
              <button type="submit" disabled={submitting} className="btn-gold w-full">
                {submitting ? "..." : labels.submit}
              </button>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
