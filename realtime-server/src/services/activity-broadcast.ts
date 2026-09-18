import { Server } from "socket.io";

export function broadcastActivity(
  io: Server,
  activity: {
    organizationId: string;
    projectId: string | null;
    taskId: string | null;
    type: string;
    message: string | null;
    createdAt: Date;
    [key: string]: unknown;
  },
) {
  io.to(`organization:${activity.organizationId}`).emit(
    "activity:created",
    activity,
  );
}
