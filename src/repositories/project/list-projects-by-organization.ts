import { prisma } from "@/lib/prisma";

export async function listProjectsByOrganization(organizationId: string) {
  return prisma.project.findMany({
    where: {
      organizationId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
