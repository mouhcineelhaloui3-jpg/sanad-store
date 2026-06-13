"use client";

import { useEffect, useState } from "react";
import { useIptvModalStore } from "@/store/iptvModalStore";
import { MessageCircle, X } from "lucide-react";

export function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const openTrial = useIptvModalStore((s) => s.openTrial);

  useEffect(() => {
    if (sessionStorage.getItem("sanad-exit-intent-shown")) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return;
      setVisible(true);
      sessionStorage.setItem("sanad-exit-intent-shown", "1");
    };

    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-labelledby="exit-title">
      <div className="relative max-w-md rounded-3xl border border-neon-gold/30 bg-dark p-8 text-center shadow-glow-gold">
        <button type="button" onClick={() => setVisible(false)} className="absolute left-4 top-4 rounded-lg p-2 text-white/50 hover:bg-white/10" aria-label="إغلاق">
          <X className="h-5 w-5" />
        </button>
        <p className="text-sm font-bold text-neon-gold">عرض محدود</p>
        <h2 id="exit-title" className="mt-2 text-2xl font-black text-white">
          جرّب SANAD IPTV مجاناً قبل المغادرة
        </h2>
        <p className="mt-3 text-sm text-white/70">+100K قناة • رياضة 4K • تفعيل فوري</p>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            openTrial();
          }}
          className="btn-gold mt-6 w-full"
        >
          <MessageCircle className="inline h-5 w-5" /> ابدأ التجربة المجانية
        </button>
      </div>
    </div>
  );
}
