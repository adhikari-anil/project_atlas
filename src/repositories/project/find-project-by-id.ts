import { prisma } from "@/lib/prisma";

export async function findProjectById(projectId: string) {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },

    include: {
      organization: true,
      createdBy: true,
    },
  });
}
