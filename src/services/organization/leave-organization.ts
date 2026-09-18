import {
  findOrganizationMember,
  removeOrganizationMember,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";

import { getCurrentOrganization, getCurrentUser } from "@/services";

import { ActivityType, OrganizationRole } from "../../../generated/prisma/enums";

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

  const result = await removeOrganizationMember(organizationId, currentUser.id);

  await createActivity({
    organizationId,
    userId: currentUser.id,
    type: ActivityType.MEMBER_REMOVED,
    message: `${currentUser.firstName} ${currentUser.lastName} left the organization`,
  });

  return result;
}
