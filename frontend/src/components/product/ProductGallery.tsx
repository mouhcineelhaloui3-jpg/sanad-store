import type { Product } from "@/lib/products";
import { ProductVisual } from "@/components/product/ProductVisual";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <ProductVisual product={product} size="lg" showBadge />
  );
}
