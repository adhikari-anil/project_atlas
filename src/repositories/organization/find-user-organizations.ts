import { prisma } from "@/lib/prisma";

export async function findUserOrganizationsByUserId(userId: string) {
  return prisma.organizationMember.findMany({
    where: {
      userId,
    },
    include: {
      organization: true,
    },
  });
}
