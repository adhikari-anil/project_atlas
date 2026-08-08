import { prisma } from "@/lib/prisma";

export async function findTaskById(taskId: string) {
  return prisma.task.findUnique({
    where: {
      id: taskId,
    },

    include: {
      project: true,
      createdBy: true,
      assignedTo: true,
    },
  });
}
