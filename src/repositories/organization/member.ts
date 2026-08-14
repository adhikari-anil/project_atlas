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

export async function createOrganizationMember(data: {
  organizationId: string;
  userId: string;
  role: "ADMIN" | "MEMBER";
}) {
  return prisma.organizationMember.create({
    data: {
      organizationId: data.organizationId,
      userId: data.userId,
      role: data.role,
    },
  });
}

export async function removeOrganizationMember(
  organizationId: string,
  userId: string,
) {
  return prisma.organizationMember.update({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    data: {
      status: "LEFT",
    },
  });
}
