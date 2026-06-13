import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { StructuredData } from "./StructuredData";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((item, index) => ({
    name: item.label,
    path: item.href ?? (index === items.length - 1 ? "" : "/")
  }));

  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd(
          schemaItems.filter((item) => item.path).map((item) => ({ name: item.name, path: item.path }))
        )}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="font-semibold text-neon-cyan hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="font-bold text-white">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
