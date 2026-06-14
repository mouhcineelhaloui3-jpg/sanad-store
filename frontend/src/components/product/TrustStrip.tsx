import { BadgeCheck, PhoneCall, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: BadgeCheck, label: "الدفع عند الاستلام" },
  { icon: PhoneCall, label: "تأكيد قبل الإرسال" },
  { icon: Truck, label: "تسليم فوري عالمياً" },
  { icon: ShieldCheck, label: "منتجات مختارة بعناية" }
];

export function TrustStrip({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-sand-700">
        {items.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4 text-sage-700" />
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-sand-100 bg-white px-4 py-3 text-sm font-bold text-sand-900"
        >
          <Icon className="h-5 w-5 shrink-0 text-sage-700" />
          {label}
        </div>
      ))}
    </div>
  );
}
