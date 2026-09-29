import { apiRequest } from "./api.js";
import { currentUser } from "./auth.js";
import { readAuthConfig } from "./config.js";

export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

export interface Project {
  id: string;
  organizationId: string;
  createdById: string;
  name: string;
  slug: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

async function projectRequest<T>(path: string, options: {
  method?: string;
  body?: unknown;
} = {}) {
  const user = await currentUser();

  if (!user) {
    throw new Error("You are not logged in.\nRun: projecthub auth login");
  }

  const config = await readAuthConfig();

  if (!config) {
    throw new Error("You are not logged in.\nRun: projecthub auth login");
  }

  if (!config.currentOrganization) {
    throw new Error("No organization selected.\nRun: projecthub org use <org>");
  }

  return apiRequest<T>(path, {
    ...options,
    token: config.accessToken,
    organizationId: config.currentOrganization.id,
  });
}

export async function listProjects() {
  const response = await projectRequest<{ projects: Project[] }>("/api/cli/projects");
  return response.projects;
}

export async function getProject(projectId: string) {
  const response = await projectRequest<{ project: Project }>(
    `/api/cli/projects/${encodeURIComponent(projectId)}`,
  );
  return response.project;
}

export async function createProject(input: ProjectInput & { name: string }) {
  const response = await projectRequest<{ project: Project }>("/api/cli/projects", {
    method: "POST",
    body: input,
  });
  return response.project;
}

export async function updateProject(projectId: string, input: ProjectInput) {
  const response = await projectRequest<{ project: Project }>(
    `/api/cli/projects/${encodeURIComponent(projectId)}`,
    { method: "PATCH", body: input },
  );
  return response.project;
}

export async function deleteProject(projectId: string) {
  const response = await projectRequest<{ project: Project }>(
    `/api/cli/projects/${encodeURIComponent(projectId)}`,
    { method: "DELETE" },
  );
  return response.project;
}