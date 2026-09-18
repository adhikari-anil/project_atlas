import {
  findUserOrganizationsByUserId,
  listActivities as listActivitiesRepository,
} from "@/repositories";

import { getCurrentUser, authorizeOrganizationMember } from "@/services";
import { OrganizationRole } from "../../../generated/prisma/enums";

interface ListActivitiesInput {
  organizationId?: string;
  projectId?: string;
  taskId?: string;

  take?: number;
}

export async function listActivities({
  organizationId,
  projectId,
  taskId,
  take,
}: ListActivitiesInput = {}) {
  const currentUser = await getCurrentUser();

  if (organizationId) {
    await authorizeOrganizationMember({
      organizationId,
      userId: currentUser.id,
      allowedRoles: [
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
        OrganizationRole.MEMBER,
      ],
    });

    return listActivitiesRepository({
      organizationId,
      projectId,
      taskId,
      take,
    });
  }

  /*
   * Dashboard feed:
   * Find all ACTIVE organizations the user belongs to.
   */

  const memberships = await findUserOrganizationsByUserId(currentUser.id);

  const organizationIds = memberships
    .filter((membership) => membership.status === "ACTIVE")
    .map((membership) => membership.organizationId);

  if (organizationIds.length === 0) {
    return [];
  }

  return listActivitiesRepository({
    organizationId,
    organizationIds,
    projectId,
    taskId,
    take,
  });
}
