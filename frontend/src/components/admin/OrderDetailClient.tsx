"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PrimaryButton, SelectField, TextAreaField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type Order = {
  id: string;
  name: string;
  phone: string;
  device: string;
  planSlug: string;
  notes: string | null;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  total: number;
  createdAt: string;
};

const ORDER_STATUSES = ["new", "contacted", "completed", "cancelled", "pending", "confirmed", "shipped", "delivered"];
const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"];
const SHIPPING_STATUSES = ["pending", "confirmed", "shipped", "delivered", "returned"];

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: order, isLoading } = useQuery({
    queryKey: ["admin", "order", orderId],
    queryFn: () => adminFetch<Order>(`/api/admin/orders/${orderId}`)
  });

  const [status, setStatus] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [shippingStatus, setShippingStatus] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const saveMutation = useMutation({
    mutationFn: () =>
      adminFetch<Order>(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: status ?? order?.status,
          paymentStatus: paymentStatus ?? order?.paymentStatus,
          shippingStatus: shippingStatus ?? order?.shippingStatus,
          notes: notes ?? order?.notes ?? undefined
        })
      }),
    onSuccess: () => {
      toast.success("Order updated");
      queryClient.invalidateQueries({ queryKey: ["admin", "order", orderId] });
      router.refresh();
    },
    onError: () => toast.error("Failed to update order")
  });

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading order…</p>;
  }

  if (!order) {
    return <p className="text-sm text-slate-500">Order not found.</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-black">Order Summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Info label="Customer" value={order.name} />
          <Info label="Phone" value={order.phone} />
          <Info label="Plan" value={order.planSlug} />
          <Info label="Device" value={order.device} />
          <Info label="Total" value={`${order.total} د.م.`} />
          <Info label="Date" value={new Date(order.createdAt).toLocaleString("ar-MA")} />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-black">Status Management</h2>
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={order.status} />
            <StatusBadge status={order.paymentStatus} />
            <StatusBadge status={order.shippingStatus} />
          </div>
          <SelectField
            label="Order status"
            options={ORDER_STATUSES}
            value={status ?? order.status}
            onChange={(value) => setStatus(value)}
          />
          <SelectField
            label="Payment status"
            options={PAYMENT_STATUSES}
            value={paymentStatus ?? order.paymentStatus}
            onChange={(value) => setPaymentStatus(value)}
          />
          <SelectField
            label="Shipping status"
            options={SHIPPING_STATUSES}
            value={shippingStatus ?? order.shippingStatus}
            onChange={(value) => setShippingStatus(value)}
          />
          <TextAreaField
            label="Notes"
            placeholder="Internal notes…"
            value={notes ?? order.notes ?? ""}
            onChange={(value) => setNotes(value)}
          />
          <PrimaryButton onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? "Saving…" : "Save status"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
