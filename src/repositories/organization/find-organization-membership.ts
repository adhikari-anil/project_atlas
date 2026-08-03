import { prisma } from "@/lib/prisma";

export async function findOrganizationMembership(
  organizationId: string,
  userId: string,
) {
  return prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    include: {
      organization: true,
    },
  });
}
