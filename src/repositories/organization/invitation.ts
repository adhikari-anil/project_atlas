import { prisma } from "@/lib/prisma";

export async function findOrganizationInvitationByEmail(
  organizationId: string,
  email: string,
) {
  return prisma.organizationInvitation.findFirst({
    where: {
      organizationId,
      email,
      acceptedAt: null,
    },
  });
}

export async function createOrganizationInvitation(data: {
  organizationId: string;
  invitedById: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  token: string;
  expiresAt: Date;
}) {
  return prisma.organizationInvitation.create({
    data,
  });
}
