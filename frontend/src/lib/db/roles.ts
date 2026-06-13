import { prisma } from "./prisma";

export type RoleDto = {
  id: string;
  name: string;
  label: string;
  userCount: number;
  permissions: string[];
};

export async function listRolesWithStats(): Promise<RoleDto[]> {
  const roles = await prisma.role.findMany({
    include: {
      permissions: { include: { permission: true } },
      _count: { select: { users: true } }
    },
    orderBy: { id: "asc" }
  });

  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    label: role.label,
    userCount: role._count.users,
    permissions: role.permissions.map((rp) => rp.permission.key)
  }));
}
