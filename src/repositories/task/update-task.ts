import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export async function updateTask(taskId: string, data: Prisma.TaskUpdateInput) {
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data,
  });
}
