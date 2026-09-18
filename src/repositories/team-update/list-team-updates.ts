import { prisma } from "@/lib/prisma";

export async function listTeamUpdates(organizationId: string, take: number = 50) {
  return prisma.teamUpdate.findMany({
    where: {
      organizationId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          email: true,
        },
      },
      task: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take,
  });
}
