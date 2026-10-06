import {
  connectToRealtime,
  getRealtimeCredentials,
  type RealtimeActivity,
} from "../../lib/realtime.js";
import { writeRealtimeWatchState } from "../../lib/realtime-state.js";

type WatchOptions = { json?: boolean };
type ActivityRecord = Record<string, unknown>;

function asRecord(value: unknown): ActivityRecord {
  return value !== null && typeof value === "object"
    ? (value as ActivityRecord)
    : {};
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function humanize(value: string): string {
  return value
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value: unknown): string {
  if (typeof value !== "string") return "Unknown time";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown time"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function printActivity(activity: RealtimeActivity) {
  const record = asRecord(activity);
  const user = asRecord(record.user);
  const project = asRecord(record.project);
  const task = asRecord(record.task);

  const actor =
    [text(user.firstName), text(user.lastName)].filter(Boolean).join(" ") ||
    "Someone";
  const type = text(record.type);
  const summary =
    text(record.description) ??
    text(record.message) ??
    (type ? humanize(type) : "Activity");
  const context = [
    text(project.name) && `Project: ${text(project.name)}`,
    text(task.title) && `Task: ${text(task.title)}`,
  ].filter((item): item is string => Boolean(item));

  console.log(`\n${summary}`);
  console.log(`  ${actor} · ${formatDate(record.createdAt)}`);
  for (const item of context) console.log(`  ${item}`);
}

export async function watchCommand(options: WatchOptions = {}) {
  const { config, organization } = await getRealtimeCredentials();
  const socket = await connectToRealtime(config.accessToken);
  let lastUpdateAt: string | null = null;
  let closing = false;

  const output = (event: string, data: Record<string, unknown> = {}) => {
    if (options.json) {
      console.log(JSON.stringify({ event, ...data }));
    }
  };

  const saveState = (
    connection: "connecting" | "connected" | "reconnecting" | "stopped",
  ) =>
    writeRealtimeWatchState({
      pid: closing ? null : process.pid,
      connection,
      lastUpdateAt,
    });

  await saveState("connecting");

  if (options.json) {
    output("watching", {
      organization: { id: organization.id, name: organization.name },
    });
  } else {
    console.log(`Watching activity for ${organization.name}. Press Ctrl+C to stop.`);
    console.log("Connecting…");
  }

  const stop = () => {
    if (closing) return;
    closing = true;
    socket.disconnect();
    void saveState("stopped");
    if (!options.json) console.log("\nStopped watching.");
  };

  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  socket.on("connect", () => {
    void saveState("connected");
    if (options.json) {
      output("connected");
    } else {
      console.log("Connected. Waiting for activity…");
    }
  });

  socket.on("disconnect", (reason: string) => {
    if (closing) return;
    void saveState("reconnecting");
    if (options.json) {
      output("disconnected", { reason });
    } else {
      console.log("Disconnected; waiting to reconnect…");
    }
  });

  socket.on("connect_error", (error: Error) => {
    void saveState("reconnecting");
    if (options.json) {
      console.error(JSON.stringify({ event: "connection_error", message: error.message }));
    } else {
      console.error(`Connection error: ${error.message}`);
    }
  });

  socket.on("activity:created", (activity: RealtimeActivity) => {
    lastUpdateAt = activity.createdAt || new Date().toISOString();
    void saveState("connected");

    if (options.json) {
      output("activity", { data: activity });
    } else {
      printActivity(activity);
    }
  });
}
