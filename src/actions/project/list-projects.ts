"use server";

import { listProjects } from "@/services";

export async function listProjectsAction(organizationId: string) {
  return listProjects(organizationId);
}
