import { findProjectById, listProjectTasks } from "@/repositories";

import { authorizeOrganizationMember, getCurrentUser } from "@/services";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function listTasks(projectId: string) {
  const currentUser = await getCurrentUser();

  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  await authorizeOrganizationMember({
    organizationId: project.organizationId,
    userId: currentUser.id,
    allowedRoles: [
      OrganizationRole.OWNER,
      OrganizationRole.ADMIN,
      OrganizationRole.MEMBER,
    ],
  });

  return listProjectTasks(projectId);
}
