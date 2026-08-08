"use server";

import { setCurrentOrganization } from "@/services";

export async function selectOrganizationAction(organizationId: string) {
  console.log("From action: ", organizationId);
  await setCurrentOrganization(organizationId);

  return {
    success: true,
  };
}
