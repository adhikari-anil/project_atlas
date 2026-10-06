import type { Command } from "commander";

import { latestCommand } from "./latest.js";
import { watchCommand } from "./watch.js";
import { statusCommand } from "./status.js";

export function registerRealtimeCommands(program: Command) {
  const realtime = program
    .command("realtime")
    .description("Read and watch realtime activity");

  realtime
    .command("latest")
    .description("Show the latest organization activity")
    .option(
      "-n, --count <count>",
      "Number of updates to show",
      (value) => {
        const count = Number(value);
        if (!Number.isInteger(count) || count < 1 || count > 50) {
          throw new Error("count must be an integer between 1 and 50.");
        }
        return count;
      },
      5,
    )
    .option("--json", "Print updates as JSON")
    .action(latestCommand);

  realtime
    .command("watch")
    .description("Watch activity updates in realtime")
    .option("--json", "Print events as JSON Lines")
    .action(watchCommand);

  realtime
    .command("status")
    .description("Show realtime watch status")
    .action(statusCommand);
}
