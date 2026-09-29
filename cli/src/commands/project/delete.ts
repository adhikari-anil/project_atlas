import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { deleteProject } from "../../lib/projects.js";

export async function deleteCommand(projectId: string, options: { yes?: boolean }) {
  if (!options.yes) {
    const terminal = createInterface({ input: stdin, output: stdout });
    const answer = await terminal.question(`Delete project ${projectId}? [y/N] `);
    terminal.close();

    if (!/^y(es)?$/i.test(answer.trim())) {
      console.log("Deletion cancelled.");
      return;
    }
  }

  const project = await deleteProject(projectId);
  console.log(`✓ Deleted project: ${project.name}`);
}