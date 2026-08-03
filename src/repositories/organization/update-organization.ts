import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export async function updateOrganization(
  organizationId: string,
  data: Prisma.OrganizationUpdateInput,
) {
  return prisma.organization.update({
    where: {
      id: organizationId,
    },
    data,
  });
}
