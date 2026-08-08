import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export async function createTask(data: Prisma.TaskCreateInput) {
  return prisma.task.create({
    data,
  });
}
