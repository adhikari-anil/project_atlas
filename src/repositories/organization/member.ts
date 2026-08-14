import { prisma } from "@/lib/prisma";

export async function findOrganizationMemberByEmail(
  organizationId: string,
  email: string,
) {
  return prisma.organizationMember.findFirst({
    where: {
      organizationId,
      user: {
        email,
      },
      status: "ACTIVE",
    },
  });
}
