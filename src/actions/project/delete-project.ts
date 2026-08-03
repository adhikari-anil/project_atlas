"use server";

import { deleteProject } from "@/services";

import { projectIdSchema } from "@/validations/project-schema";

export async function deleteProjectAction(projectId: string) {
  projectIdSchema.parse({
    projectId,
  });

  return deleteProject(projectId);
}
