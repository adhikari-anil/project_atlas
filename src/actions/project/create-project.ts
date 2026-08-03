"use server";

import { createProject } from "@/services";
import {
  createProjectSchema,
  CreateProjectInput,
} from "@/validations/project-schema";

export async function createProjectAction(
  organizationId: string,
  data: CreateProjectInput,
) {
  const validated = createProjectSchema.parse(data);

  return createProject(organizationId, validated);
}
