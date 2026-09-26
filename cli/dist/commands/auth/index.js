import { loginCommand } from "./login.js";
import { logoutCommand } from "./logout.js";
import { statusCommand } from "./status.js";
export function registerAuthCommands(command) {
    const auth = command
        .command("auth")
        .description("Manage Product authentication");
    auth
        .command("login")
        .description("Sign in to Product")
        .action(loginCommand);
    auth
        .command("logout")
        .description("Sign out of Product")
        .action(logoutCommand);
    auth
        .command("status")
        .description("Show the current authentication status")
        .action(statusCommand);
}
