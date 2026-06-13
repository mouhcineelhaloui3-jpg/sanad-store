import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OrderDetailClient } from "@/components/admin/OrderDetailClient";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <AdminPageHeader title={`Order ${id.slice(0, 8)}…`} description="View order details and update status from PostgreSQL." />
      <OrderDetailClient orderId={id} />
    </>
  );
}
