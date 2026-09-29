import type { Project } from "../../lib/projects.js";

export function printProject(project: Project) {
  console.log(`Name: ${project.name}`);
  console.log(`Slug: ${project.slug}`);
  console.log(`ID: ${project.id}`);
  console.log(`Status: ${project.status}`);
  if (project.description) {
    console.log(`Description: ${project.description}`);
  }
}
