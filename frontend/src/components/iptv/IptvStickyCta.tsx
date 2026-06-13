"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence  } from "@/components/motion";
import { ui } from "@/lib/i18n/ui-strings";
import { useLocaleStore } from "@/store/localeStore";
import { useIptvModalStore } from "@/store/iptvModalStore";

export function IptvStickyCta() {
  const locale = useLocaleStore((s) => s.locale);
  const openOrder = useIptvModalStore((s) => s.openOrder);
  const openTrial = useIptvModalStore((s) => s.openTrial);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labels = {
    trial: ui("freeTrial", locale),
    subscribe: ui("subscribe", locale)
  };

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-dark p-3 md:hidden"
        >
          <div className="mx-auto flex max-w-lg gap-2">
            <button type="button" onClick={openTrial} className="btn-neon-outline flex-1 py-3 text-sm">
              {labels.trial}
            </button>
            <button type="button" onClick={() => openOrder()} className="btn-neon flex-1 py-3 text-sm">
              {labels.subscribe}
            </button>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
