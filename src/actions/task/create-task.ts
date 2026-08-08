"use server";

import { createTask } from "@/services";

import { createTaskSchema, CreateTaskInput } from "@/validations/task-schema";

export async function createTaskAction(
  projectId: string,
  data: CreateTaskInput,
) {
  const validated = createTaskSchema.parse(data);

  return createTask(projectId, validated);
}
