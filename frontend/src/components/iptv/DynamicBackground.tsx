"use client";

export function DynamicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="gradient-bg absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/2 h-80 w-80 rounded-full bg-neon-green/8 blur-[100px]" />
      <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-neon-gold/5 blur-[80px]" />
    </div>
  );
}
