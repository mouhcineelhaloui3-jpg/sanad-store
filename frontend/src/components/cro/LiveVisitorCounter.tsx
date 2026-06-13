"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function LiveVisitorCounter() {
  const [count, setCount] = useState(24);

  useEffect(() => {
    const base = 18 + Math.floor(Math.random() * 15);
    setCount(base);
    const id = window.setInterval(() => {
      setCount((c) => Math.max(12, c + (Math.random() > 0.5 ? 1 : -1)));
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="fixed bottom-24 left-4 z-30 hidden items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-2 text-xs font-bold text-neon-green backdrop-blur-md md:flex"
      aria-live="polite"
    >
      <Users className="h-4 w-4" />
      <span>{count} زائر الآن</span>
    </div>
  );
}
