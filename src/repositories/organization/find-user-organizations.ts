import { prisma } from "@/lib/prisma";

export async function findUserOrganizations(userId: string) {
  return prisma.organizationMember.findMany({
    where: {
      userId,
    },
    include: {
      organization: true,
    },
  });
}
