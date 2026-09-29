import type { ProjectInput } from "../../lib/projects.js";
import { createProject } from "../../lib/projects.js";

export async function createCommand(options: ProjectInput & { name: string }) {
  const project = await createProject(options);
  console.log(`✓ Created project: ${project.name}`);
  console.log(`ID: ${project.id}`);
}