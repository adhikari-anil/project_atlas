"use server";

import { listProjectMembers } from "@/services";

export async function listProjectMembersAction(projectId: string) {
  return listProjectMembers(projectId);
}
