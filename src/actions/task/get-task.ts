"use server";

import { getTask } from "@/services";

import { taskIdSchema } from "@/validations/task-schema";

export async function getTaskAction(taskId: string) {
  taskIdSchema.parse({
    taskId,
  });

  return getTask(taskId);
}
