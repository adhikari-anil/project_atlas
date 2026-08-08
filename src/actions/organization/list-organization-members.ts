"use server";

import { listOrganizationMembers } from "@/services";

export async function listOrganizationMembersAction(organizationId: string) {
  return listOrganizationMembers(organizationId);
}
