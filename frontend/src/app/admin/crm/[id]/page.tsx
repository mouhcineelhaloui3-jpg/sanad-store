import { CrmLeadDetailClient } from "@/components/admin/CrmLeadDetailClient";

export default async function CrmLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CrmLeadDetailClient leadId={id} />;
}
