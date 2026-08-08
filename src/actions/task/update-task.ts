"use server";

import { updateTask } from "@/services";

import {
  updateTaskSchema,
  taskIdSchema,
  UpdateTaskInput,
} from "@/validations/task-schema";

export async function updateTaskAction(taskId: string, data: UpdateTaskInput) {
  taskIdSchema.parse({
    taskId,
  });

  const validated = updateTaskSchema.parse(data);

  return updateTask(taskId, validated);
}
