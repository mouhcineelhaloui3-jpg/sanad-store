"use client";

import { useEffect, useRef, useState } from "react";

function formatNumber(value: number, suffix: string) {
  if (suffix === "%") return `${value}${suffix}`;
  if (value >= 1000) return `+${Math.round(value / 1000)}K`;
  return `+${value.toLocaleString()}`;
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
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted =
    suffix === "%"
      ? `${prefix}${display}${suffix}`
      : value >= 1000
        ? `${prefix}${Math.round(display / 1000)}K`
        : `${prefix}${display.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums">
      {started.current ? formatted : formatNumber(0, suffix)}
    </span>
  );
}
