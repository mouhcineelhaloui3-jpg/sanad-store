"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function UrgencyBanner() {
  const [minutes, setMinutes] = useState(47);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMinutes((m) => (m > 5 ? m - 1 : 47));
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="border-b border-neon-gold/20 bg-gradient-to-l from-neon-gold/10 to-transparent px-4 py-2 text-center text-xs font-bold text-neon-gold md:text-sm">
      <Clock className="mr-1 inline h-4 w-4" aria-hidden />
      عرض التفعيل الفوري — متبقي تقريباً {minutes} دقيقة على الدعم السريع
    </div>
  );
}
