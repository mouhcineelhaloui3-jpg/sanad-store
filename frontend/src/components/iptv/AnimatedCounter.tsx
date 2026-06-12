"use client";

import { useEffect, useRef, useState } from "react";

function formatValue(value: number, prefix: string, suffix: string) {
  if (suffix === "%") return `${prefix}${value}${suffix}`;
  if (value >= 1000) return `${prefix}${Math.round(value / 1000)}K`;
  return `${prefix}${value.toLocaleString()}${suffix}`;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || animated.current) return;
        animated.current = true;
        setDisplay(0);
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums" suppressHydrationWarning>
      {formatValue(display, prefix, suffix)}
    </span>
  );
}
