import { prisma } from "@/lib/prisma";

export async function findOrganizationBySlug(slug: string) {
  return prisma.organization.findUnique({
    where: {
      slug,
    },
  });
}
