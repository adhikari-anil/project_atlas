import {
  findOrganizationMember,
  removeOrganizationMember,
} from "@/repositories";

import { getCurrentOrganization, getCurrentUser } from "@/services";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function leaveOrganization() {
  const currentUser = await getCurrentUser();

  const organizationId = await getCurrentOrganization();

  const membership = await findOrganizationMember(
    organizationId,
    currentUser.id,
  );

  if (!membership) {
    throw new Error("You are not a member of this organization.");
  }

  if (membership.status !== "ACTIVE") {
    throw new Error("You are not an active member of this organization.");
  }

  if (membership.role === OrganizationRole.OWNER) {
    throw new Error("The organization owner cannot leave the organization.");
  }

  return removeOrganizationMember(organizationId, currentUser.id);
}
