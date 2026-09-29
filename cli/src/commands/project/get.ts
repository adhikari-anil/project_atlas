import { printProject } from "./shared.js";
import { getProject } from "../../lib/projects.js";

export async function getCommand(projectId: string) {
  printProject(await getProject(projectId));
}