export function SectionDivider() {
  return (
    <div className="relative mx-auto my-4 h-px max-w-4xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      <div className="divider-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
