const REALTIME_SERVER_URL =
  process.env.REALTIME_SERVER_URL ?? "http://localhost:4000";

const REALTIME_INTERNAL_SECRET = process.env.REALTIME_INTERNAL_SECRET!;

export async function publishActivity(activity: {
  id: string;
  organizationId: string;
  projectId: string | null;
  taskId: string | null;
  userId: string;
  type: string;
  message: string;
  createdAt: Date;
}) {
  const response = await fetch(`${REALTIME_SERVER_URL}/internal/activity`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": REALTIME_INTERNAL_SECRET,
    },

    body: JSON.stringify({
      ...activity,

      createdAt: activity.createdAt.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to publish realtime activity.");
  }
}
