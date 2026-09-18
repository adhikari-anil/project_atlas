import { getCurrentUser } from "@/services/auth/getCurrentUser";

import { findOrganizationMembership } from "@/repositories";

export async function getOrganization(organizationId: string) {
  const user = await getCurrentUser();

  const membership = await findOrganizationMembership(organizationId, user.id);

  if (!membership || membership.status !== "ACTIVE") {
    throw new Error("Organization not found.");
  }

  return membership.organization;
}
