import { prisma } from "@/lib/prisma";

export async function deleteProject(projectId: string) {
  return prisma.project.delete({
    where: {
      id: projectId,
    },
  });
}
