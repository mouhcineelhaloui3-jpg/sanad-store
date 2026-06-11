import type { Product } from "@/lib/products";

const accents: Record<
  string,
  { gradient: string; glow: string; icon: string; label: string }
> = {
  "sanad-align": {
    gradient: "from-[#3d5a4a] via-[#51715e] to-[#8aab96]",
    glow: "bg-sage-700/20",
    icon: "🧍",
    label: "وضعية وكتاف"
  },
  "sanad-heat": {
    gradient: "from-[#8b3a2a] via-[#c45c3e] to-[#e8a87c]",
    glow: "bg-orange-400/20",
    icon: "🔥",
    label: "رقبة وحرارة"
  },
  "sanad-lumbo": {
    gradient: "from-[#3a2a1c] via-[#6f5438] to-[#a98255]",
    glow: "bg-sand-500/20",
    icon: "💪",
    label: "أسفل الظهر"
  }
};

const defaultAccent = accents["sanad-align"];

type ProductVisualProps = {
  product: Product;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
};

const sizeClasses = {
  sm: { wrap: "rounded-[1.25rem]", inner: "rounded-[1rem] p-4", title: "text-xl", type: "text-xs" },
  md: { wrap: "rounded-[1.5rem]", inner: "rounded-[1.25rem] p-6", title: "text-2xl", type: "text-sm" },
  lg: { wrap: "rounded-[2rem]", inner: "rounded-[1.75rem] p-8", title: "text-4xl", type: "text-sm" }
};

export function ProductVisual({ product, size = "md", showBadge = true }: ProductVisualProps) {
  const accent = accents[product.id] ?? defaultAccent;
  const s = sizeClasses[size];

  return (
    <div className={`relative overflow-hidden ${s.wrap} bg-gradient-to-br ${accent.gradient} shadow-soft`}>
      <div className={`absolute -left-8 -top-8 h-32 w-32 rounded-full ${accent.glow} blur-2xl`} />
      <div className={`absolute -bottom-10 -right-6 h-40 w-40 rounded-full ${accent.glow} blur-3xl`} />
      <div
        className={`relative flex aspect-[4/3] flex-col items-center justify-center text-center text-white ${s.inner}`}
      >
        {showBadge ? (
          <span className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
            {accent.label}
          </span>
        ) : null}
        <span className="text-4xl" aria-hidden>
          {accent.icon}
        </span>
        <p className={`mt-3 font-bold text-white/80 ${s.type}`}>{product.type}</p>
        <p className={`mt-1 font-black leading-tight ${s.title}`}>{product.shortName}</p>
        <p className="mt-2 max-w-[16rem] text-xs leading-6 text-white/75">{product.problem}</p>
      </div>
    </div>
  );
}
