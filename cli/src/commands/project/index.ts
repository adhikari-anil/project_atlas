import { Command, Option } from "commander";

import { createCommand } from "./create.js";
import { deleteCommand } from "./delete.js";
import { getCommand } from "./get.js";
import { listCommand } from "./list.js";
import { updateCommand } from "./update.js";

const PROJECT_STATUSES = ["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "ARCHIVED"];

export function registerProjectCommands(program: Command) {
  const project = program.command("project").description("Manage projects");

  project.command("list").description("List projects in the current organization").action(listCommand);
  project.command("get <projectId>").description("Show project details").action(getCommand);
  project
    .command("create")
    .description("Create a project in the current organization")
    .requiredOption("-n, --name <name>", "Project name")
    .option("-d, --description <description>", "Project description")
    .addOption(
      new Option("-s, --status <status>", "Project status").choices(
        PROJECT_STATUSES,
      ),
    )
    .action(createCommand);
  project
    .command("update <projectId>")
    .description("Update a project")
    .option("-n, --name <name>", "Project name")
    .option("-d, --description <description>", "Project description")
    .addOption(
      new Option("-s, --status <status>", "Project status").choices(
        PROJECT_STATUSES,
      ),
    )
    .action(updateCommand);
  project
    .command("delete <projectId>")
    .description("Delete a project (OWNER or ADMIN)")
    .option("-y, --yes", "Skip confirmation")
    .action(deleteCommand);
}