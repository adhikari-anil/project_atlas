import { prisma } from "@/lib/prisma";

export async function updateOrganizationMemberRole(
  organizationId: string,
  userId: string,
  role: "ADMIN" | "MEMBER",
) {
  const memberShip = await prisma.organizationMember.update({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    data: {
      role,
    },
  });
  return memberShip;
}
