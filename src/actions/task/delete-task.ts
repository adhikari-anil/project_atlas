"use server";

import { deleteTask } from "@/services";

import { taskIdSchema } from "@/validations/task-schema";

export async function deleteTaskAction(taskId: string) {
  taskIdSchema.parse({
    taskId,
  });

  return deleteTask(taskId);
}
