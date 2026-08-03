import { prisma } from "@/lib/prisma";
import { CreateOrganizationInput } from "@/validations/organization-schema";
import { getCurrentUser } from "../auth/getCurrentUser";
import { findOrganizationBySlug } from "@/repositories/index";
import { OrganizationRole } from "../../../generated/prisma/enums";

export async function createOrganization(data: CreateOrganizationInput) {
  const user = await getCurrentUser();

  const existingOrganization = await findOrganizationBySlug(data.slug);

  if (existingOrganization) {
    throw new Error("Organization slug already exists.");
  }

  const organization = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        logoUrl: data.logoUrl || null,
        ownerId: user.id,
      },
    });

    await tx.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        role: OrganizationRole.OWNER,
      },
    });

    return organization;
  });

  return organization;
}
