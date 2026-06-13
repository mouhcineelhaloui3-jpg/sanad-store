import { ProductFormClient } from "@/components/admin/ProductFormClient";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductFormClient productId={id} />;
}
