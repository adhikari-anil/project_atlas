import type { ProjectInput } from "../../lib/projects.js";
import { updateProject } from "../../lib/projects.js";

export async function updateCommand(projectId: string, options: ProjectInput) {
  if (Object.keys(options).length === 0) {
    throw new Error("Provide at least one option to update.");
  }

  const project = await updateProject(projectId, options);
  console.log(`✓ Updated project: ${project.name}`);
}