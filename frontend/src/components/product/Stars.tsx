import { Star } from "lucide-react";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`} aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < full ? "fill-amber-400 text-amber-400" : "text-sand-100"}`}
        />
      ))}
    </span>
  );
}
