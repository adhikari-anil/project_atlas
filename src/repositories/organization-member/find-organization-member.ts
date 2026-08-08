import { prisma } from "@/lib/prisma";

export async function findOrganizationMember(
  organizationId: string,
  userId: string,
) {
  const memberShip = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  });
  return memberShip;
}
