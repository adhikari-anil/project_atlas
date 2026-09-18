interface BroadcastActivityInput {
  id: string;
  organizationId: string;
  projectId?: string | null;
  taskId?: string | null;
  userId?: string;
  type: string;
  message?: string | null;
  createdAt: Date | string;
  user?: { id: string; firstName: string; lastName: string; avatarUrl: string | null } | null;
  organization?: { id: string; name: string } | null;
  project?: { id: string; name: string } | null;
  task?: { id: string; title: string } | null;
}

export async function broadcastActivity(activity: BroadcastActivityInput) {
  const secret =
    process.env.REALTIME_INTERNAL_SECRET || process.env.INTERNAL_API_SECRET;
  const url = process.env.REALTIME_SERVER_URL || "http://localhost:4000";

  if (!secret) {
    console.warn("Skipping realtime broadcast: REALTIME_INTERNAL_SECRET is not configured.");
    return;
  }

  try {
    const res = await fetch(`${url}/internal/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": secret,
      },
      body: JSON.stringify({
        ...activity,
        createdAt:
          activity.createdAt instanceof Date
            ? activity.createdAt.toISOString()
            : activity.createdAt,
      }),
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      console.warn(`Realtime broadcast responded with status: ${res.status}`);
    }
  } catch (error) {
    console.warn(
      "Failed to broadcast activity to realtime server:",
      error instanceof Error ? error.message : error,
    );
  }
}
