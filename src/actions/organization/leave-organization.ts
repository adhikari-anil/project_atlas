"use server";

import { leaveOrganization } from "@/services";

export async function leaveOrganizationAction() {
  return leaveOrganization();
}
