import { ApiError } from "../../lib/api.js";
import { listProjects } from "../../lib/projects.js";

export async function listCommand() {
  try {
    const projects = await listProjects();

    if (projects.length === 0) {
      console.log("No projects found in the current organization.");
      return;
    }

    for (const project of projects) {
      console.log(`${project.slug}  ${project.name}  (${project.status})  ${project.id}`);
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new Error("You are not logged in.\nRun: projecthub auth login");
    }
    if (error instanceof ApiError && error.status === 400) {
      throw new Error("No organization selected.\nRun: projecthub org use <org>");
    }
    throw error;
  }
}