import { AdminCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CreditCard } from "lucide-react";

export default function AdminBillingPage() {
  return (
    <>
      <AdminPageHeader
        title="Billing"
        description="Stripe-ready billing module placeholder for future SaaS subscriptions."
      />
      <AdminCard title="Stripe integration">
        <AdminEmptyState
          title="Billing module coming soon"
          description="Architecture is prepared for Stripe customer portal, invoices, and plan management."
          icon={CreditCard}
        />
      </AdminCard>
    </>
  );
}
