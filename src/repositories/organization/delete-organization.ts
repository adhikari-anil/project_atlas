import { prisma } from "@/lib/prisma";

export async function deleteOrganization(organizationId: string) {
  return prisma.organization.delete({
    where: {
      id: organizationId,
    },
  });
}
