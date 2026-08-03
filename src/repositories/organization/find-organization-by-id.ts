import { prisma } from "@/lib/prisma";

export async function findOrganizationById(organizationId: string) {
  return prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
}
