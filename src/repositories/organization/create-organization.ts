import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export async function createOrganization(data: Prisma.OrganizationCreateInput) {
  return prisma.organization.create({
    data,
  });
}
