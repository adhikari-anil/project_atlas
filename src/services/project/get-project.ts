import { findProjectById } from "@/repositories";

export async function getProject(projectId: string) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  return project;
}
