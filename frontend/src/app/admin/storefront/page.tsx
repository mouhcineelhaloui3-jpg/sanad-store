import { Suspense } from "react";
import { StorefrontCmsEditor } from "@/components/admin/StorefrontCmsEditor";
import { AdminPageSkeleton } from "@/components/admin/AdminSkeleton";

export default function StorefrontCmsPage() {
  return (
    <Suspense fallback={<AdminPageSkeleton />}>
      <StorefrontCmsEditor />
    </Suspense>
  );
}
