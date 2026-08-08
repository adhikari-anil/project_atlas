import { prisma } from "@/lib/prisma";

export async function listProjectTasks(projectId: string) {
  return prisma.task.findMany({
    where: {
      projectId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
