#!/usr/bin/env node

import { Command } from "commander";

import { registerAuthCommands } from "./commands/auth/index.js";
import { contextCommand } from "./commands/context.js";
import { registerOrganizationCommands } from "./commands/org/index.js";

const program = new Command();

program
  .name("product")
  .description("Product command-line interface")
  .version("0.1.0");

registerAuthCommands(program);
registerOrganizationCommands(program);
program
  .command("context")
  .description("Show the current CLI context")
  .action(contextCommand);

program.parseAsync().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Command failed.";
  console.error(`✗ ${message}`);
  process.exitCode = 1;
});