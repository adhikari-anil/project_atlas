import { findProjectById, listOrganizationMembers } from "@/repositories";

import { authorizeOrganizationMember, getCurrentUser } from "@/services";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function listProjectMembers(projectId: string) {
  // Current User
  const currentUser = await getCurrentUser();

  // Find Project
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  // Authorize User

  await authorizeOrganizationMember({
    organizationId: project.organizationId,
    userId: currentUser.id,
    allowedRoles: [
      OrganizationRole.OWNER,
      OrganizationRole.ADMIN,
      OrganizationRole.MEMBER,
    ],
  });

  // Return Members
  return listOrganizationMembers(project.organizationId);
}
