import { listCommand } from "./list.js";
import { useCommand } from "./use.js";
export function registerOrganizationCommands(command) {
    const organization = command
        .command("org")
        .description("Manage organizations");
    organization
        .command("list")
        .description("List organizations you can access")
        .action(listCommand);
    organization
        .command("use <org>")
        .description("Select the current organization by ID or slug")
        .action(useCommand);
}
