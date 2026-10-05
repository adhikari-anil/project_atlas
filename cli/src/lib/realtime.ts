import { io, type Socket } from "socket.io-client";

import { apiRequest } from "./api.js";
import { currentUser } from "./auth.js";
import { readAuthConfig } from "./config.js";

export interface RealtimeActivity {
  id: string;
  type: string;
  createdAt: string;
  [key: string]: unknown;
}

export async function getRealtimeCredentials() {
  const user = await currentUser();
  const config = await readAuthConfig();

  if (!user || !config) {
    throw new Error("You are not logged in.\nRun: projecthub auth login");
  }

  if (!config.currentOrganization) {
    throw new Error("No organization selected.\nRun: projecthub org use <org>");
  }

  return { config, organization: config.currentOrganization };
}

export async function getLatestActivities(count = 5): Promise<RealtimeActivity[]> {
  const { config, organization } = await getRealtimeCredentials();
  const response = await apiRequest<{ activities: RealtimeActivity[] }>(
    `/api/cli/activities/latest?count=${encodeURIComponent(String(count))}`,
    {
      token: config.accessToken,
      organizationId: organization.id,
    },
  );

  return response.activities;
}

export async function connectToRealtime(accessToken: string): Promise<Socket> {
  const url =
    process.env.PRODUCT_REALTIME_URL ||
    process.env.REALTIME_SERVER_URL ||
    "http://localhost:4000";

  return io(url, {
    withCredentials: true,
    extraHeaders: {
      Cookie: `access_token=${encodeURIComponent(accessToken)}`,
    },
  });
}
