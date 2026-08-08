import { prisma } from "@/lib/prisma";

export async function listOrganizationMembers(organizationId: string) {
  return prisma.organizationMember.findMany({
    where: {
      organizationId,
      status: "ACTIVE",
    },

    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
        },
      },
    },

    orderBy: {
      joinedAt: "asc",
    },
  });
}
