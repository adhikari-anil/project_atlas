import {
  getLatestActivities,
  type RealtimeActivity,
} from "../../lib/realtime.js";

type LatestCommandOptions = {
  count?: number;
  json?: boolean;
};

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
  if (typeof value !== "string") return "Unknown date";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function formatActivity(activity: RealtimeActivity, index: number): string {
  const record = asRecord(activity);
  const user = asRecord(record.user);
  const project = asRecord(record.project);
  const task = asRecord(record.task);

  const actor =
    [text(user.firstName), text(user.lastName)].filter(Boolean).join(" ") ||
    "Someone";
  const type = text(record.type);
  const description =
    text(record.description) ??
    text(record.message) ??
    (type ? humanize(type) : "Activity");

  const context = [
    text(project.name) && `Project: ${text(project.name)}`,
    text(task.title) && `Task: ${text(task.title)}`,
  ].filter((item): item is string => Boolean(item));

  return [
    `${index + 1}. ${description}`,
    `   ${actor} · ${formatDate(record.createdAt)}`,
    ...context.map((item) => `   ${item}`),
  ].join("\n");
}

export async function latestCommand(options: LatestCommandOptions = {}) {
  const count = options.count ?? 5;
  const activities = await getLatestActivities(count);

  if (options.json) {
    console.log(JSON.stringify(activities, null, 2));
    return;
  }

  if (activities.length === 0) {
    console.log("No activity found for the current organization.");
    return;
  }

  console.log(
    `Latest ${activities.length} ${activities.length === 1 ? "update" : "updates"}`,
  );
  console.log("─".repeat(32));
  console.log(activities.map(formatActivity).join("\n\n"));
}
