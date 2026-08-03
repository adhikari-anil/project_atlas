"use server";

import { getProject } from "@/services";

import { projectIdSchema } from "@/validations/project-schema";

export async function getProjectAction(projectId: string) {
  projectIdSchema.parse({
    projectId,
  });

  return getProject(projectId);
}
