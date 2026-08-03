import { prisma } from "@/lib/prisma";

export async function findProjectBySlug(organizationId: string, slug: string) {
  return prisma.project.findFirst({
    where: {
      organizationId,
      slug,
    },
  });
}
