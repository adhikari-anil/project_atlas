"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import {
  CheckCircle2,
  FolderPlus,
  PlusCircle,
  Trash2,
  UserPlus,
  MessageSquare,
  Sparkles,
  FolderKanban,
  CheckSquare,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  organizationId?: string;
  type: string;
  message: string | null;
  createdAt: Date | string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  } | null;
  organization?: {
    id: string;
    name: string;
  } | null;
  project?: {
    id: string;
    name: string;
  } | null;
  task?: {
    id: string;
    title: string;
  } | null;
}

interface RecentActivitiesFeedProps {
  initialActivities: ActivityItem[];
  organizationId?: string;
}

function getActivityIcon(type: string) {
  switch (type) {
    case "TASK_COMPLETED":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "TASK_CREATED":
      return <PlusCircle className="w-4 h-4 text-blue-500" />;
    case "TASK_DELETED":
      return <Trash2 className="w-4 h-4 text-red-400" />;
    case "PROJECT_CREATED":
      return <FolderPlus className="w-4 h-4 text-purple-500" />;
    case "PROJECT_DELETED":
      return <Trash2 className="w-4 h-4 text-red-500" />;
    case "MEMBER_JOINED":
      return <UserPlus className="w-4 h-4 text-teal-500" />;
    case "TEAM_UPDATE":
      return <MessageSquare className="w-4 h-4 text-amber-500" />;
    case "TASK_UPDATED":
      return <CheckSquare className="w-4 h-4 text-sky-500" />;
    case "PROJECT_UPDATED":
      return <FolderKanban className="w-4 h-4 text-indigo-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-gray-400" />;
  }
}

function formatTimeAgo(dateInput: Date | string) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
}

export function RecentActivitiesFeed({
  initialActivities,
  organizationId,
}: RecentActivitiesFeedProps) {
  const [activities, setActivities] =
    useState<ActivityItem[]>(initialActivities);
  const [isConnected, setIsConnected] = useState(() => socket.connected);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    function onConnect() {
      console.log("SOCKET CONNECTED:", socket.id);
      setIsConnected(true);
      setConnectionError(null);
      if (organizationId) {
        console.log("Joining organization:", organizationId);
        socket.emit("organization:join", organizationId);
      }
    }

    function onDisconnect() {
      console.log("SOCKET DISCONNECTED");
      setIsConnected(false);
    }

    function onConnectError(error: Error) {
      console.error("SOCKET CONNECTION FAILED:", error.message);
      setIsConnected(false);
      setConnectionError(error.message || "Unable to connect to the realtime server.");
    }

    function onNewActivity(newActivity: ActivityItem) {
      console.log("🔥 RECEIVED ACTIVITY:", newActivity);
      // If scoped to organization, filter out other organizations
      if (
        organizationId &&
        (newActivity.organization?.id || newActivity.organizationId) &&
        (newActivity.organization?.id || newActivity.organizationId) !==
          organizationId
      ) {
        return;
      }

      setActivities((prev) => {
        // Prevent duplicate IDs
        if (prev.some((a) => a.id === newActivity.id)) {
          return prev;
        }
        return [newActivity, ...prev].slice(0, 50);
      });
    }

    if (socket.connected && organizationId) {
      socket.emit("organization:join", organizationId);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("activity:created", onNewActivity);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("activity:created", onNewActivity);
    };
  }, [organizationId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
            }`}
          />
          <span className="text-xs text-muted-foreground font-mono" role="status">
            {isConnected
              ? "Live stream active"
              : connectionError
                ? `Realtime unavailable: ${connectionError}`
                : "Connecting to realtime..."}
          </span>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
          No activity recorded yet. Create projects, tasks, or post updates to
          see them here in real-time.
        </div>
      ) : (
        <div className="divide-y divide-border/60">
          {activities.map((act) => {
            const userName = act.user
              ? `${act.user.firstName} ${act.user.lastName}`
              : "System";

            return (
              <div
                key={act.id}
                className="py-3 flex items-start gap-3 transition-colors hover:bg-muted/30 px-2 rounded-md"
              >
                <div className="mt-0.5 p-1.5 rounded-full bg-muted flex items-center justify-center shrink-0">
                  {getActivityIcon(act.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    <span className="font-semibold">{userName}</span>{" "}
                    <span className="text-muted-foreground font-normal">
                      {act.message || act.type.replace(/_/g, " ").toLowerCase()}
                    </span>
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{formatTimeAgo(act.createdAt)}</span>
                    {act.organization?.name && (
                      <>
                        <span>•</span>
                        <span className="truncate">
                          {act.organization.name}
                        </span>
                      </>
                    )}
                    {act.project?.name && (
                      <>
                        <span>•</span>
                        <span className="truncate text-foreground/70">
                          {act.project.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
