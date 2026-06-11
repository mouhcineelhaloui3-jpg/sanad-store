import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { roles } from "@/lib/admin/data";

export default function RolesPage() {
  return (
    <>
      <AdminPageHeader title="User & Admin Roles" description="Manage Super Admin, Admin, Staff, and role permissions." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Invite Admin User">
          <div className="space-y-4">
            <TextField label="Name" placeholder="Team member" />
            <TextField label="Email" placeholder="admin@sanad.ma" type="email" />
            <SelectField label="Role" options={["Super Admin", "Admin", "Staff"]} />
            <PrimaryButton>Send invite</PrimaryButton>
          </div>
        </AdminCard>
        <AdminCard title="Role Permissions">
          <AdminTable
            rows={roles}
            columns={[
              { header: "Role", cell: (row) => <span className="font-black">{row.role}</span> },
              { header: "Users", cell: (row) => row.users },
              { header: "Permissions", cell: (row) => row.permissions },
              { header: "Action", cell: () => <button className="font-bold text-sand-700">Edit permissions</button> }
            ]}
          />
        </AdminCard>
      </div>
    </>
  );
}
