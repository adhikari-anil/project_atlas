import { updateProject as updateProjectRepository } from "@/repositories";

import { UpdateProjectInput } from "@/validations/project-schema";

export async function updateProject(
  projectId: string,
  data: UpdateProjectInput,
) {
  return updateProjectRepository(projectId, data);
}
