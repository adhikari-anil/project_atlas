import { prisma } from "@/lib/prisma";

export async function deleteTask(taskId: string) {
  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}
