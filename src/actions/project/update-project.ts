"use server";

import { updateProject } from "@/services";

import {
  updateProjectSchema,
  projectIdSchema,
  UpdateProjectInput,
} from "@/validations/project-schema";

export async function updateProjectAction(
  projectId: string,
  data: UpdateProjectInput,
) {
  projectIdSchema.parse({
    projectId,
  });

  const validated = updateProjectSchema.parse(data);

  return updateProject(projectId, validated);
}
