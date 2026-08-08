"use server";

import { listTasks } from "@/services";

export async function listTasksAction(projectId: string) {
  return listTasks(projectId);
}
