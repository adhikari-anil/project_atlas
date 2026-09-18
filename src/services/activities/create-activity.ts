import { ActivityType } from "../../../generated/prisma/enums";

import { createActivity as createActivityRepository } from "@/repositories";
import { broadcastActivity } from "../realtime/broadcast-activity";

interface CreateActivityInput {
  organizationId: string;
  projectId?: string;
  taskId?: string;
  userId: string;
  type: ActivityType;
  message?: string;
}

export async function createActivity(data: CreateActivityInput) {
  const activity = await createActivityRepository(data);

  // Send the same enriched shape used by the initial feed. This lets a client
  // render a new event without a second database request.
  await broadcastActivity(activity);

  return activity;
}
