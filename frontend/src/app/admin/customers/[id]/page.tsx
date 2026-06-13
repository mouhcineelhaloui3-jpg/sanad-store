import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CustomerDetailClient } from "@/components/admin/CustomerDetailClient";

export default async function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <AdminPageHeader title="Customer Profile" description="Customer profile, purchase history, activity, and lifetime value." />
      <CustomerDetailClient customerId={id} />
    </>
  );
}
