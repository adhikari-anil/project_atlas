import { deleteProject as deleteProjectRepository } from "@/repositories";

export async function deleteProject(projectId: string) {
  return deleteProjectRepository(projectId);
}
