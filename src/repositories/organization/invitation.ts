import { prisma } from "@/lib/prisma";
import { OrganizationRole } from "../../../generated/prisma/enums";

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

export async function findOrganizationInvitationByToken(token: string) {
  return prisma.organizationInvitation.findUnique({
    where: {
      token,
    },
  });
}

export async function acceptOrganizationInvitation(invitationId: string) {
  return prisma.organizationInvitation.update({
    where: {
      id: invitationId,
    },
    data: {
      acceptedAt: new Date(),
    },
  });
}

export async function acceptInvitationTransaction(
  invitationId: string,
  organizationId: string,
  userId: string,
  role: "ADMIN" | "MEMBER",
) {
  return prisma.$transaction(async (tx) => {
    const member = await tx.organizationMember.create({
      data: {
        organizationId,
        userId,
        role,
      },
    });

    await tx.organizationInvitation.update({
      where: {
        id: invitationId,
      },
      data: {
        acceptedAt: new Date(),
      },
    });

    return member;
  });
}

export async function rejoinOrganization(
  invitationId: string,
  organizationId: string,
  userId: string,
  role: OrganizationRole,
) {
  return prisma.$transaction(async (tx) => {
    const member = await tx.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
      data: {
        status: "ACTIVE",
        role: role,
      },
    });

    await tx.organizationInvitation.update({
      where: {
        id: invitationId,
      },
      data: {
        acceptedAt: new Date(),
      },
    });
    return member;
  });
}
