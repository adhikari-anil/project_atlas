"use server";

import { createProject } from "@/services";
import {
  createProjectSchema,
  CreateProjectInput,
} from "@/validations/project-schema";

export async function createProjectAction(
  data: CreateProjectInput,
) {
  const validated = createProjectSchema.parse(data);

  return createProject(validated);
}
