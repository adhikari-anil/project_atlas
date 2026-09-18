import {
  deleteProject as deleteProjectRepository,
  findProjectById,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";
import { getCurrentUser } from "@/services/index";
import { ActivityType, OrganizationRole } from "../../../generated/prisma/enums";
import { authorizeOrganizationMember } from "@/services/auth/authorize-organization-member";

export async function deleteProject(projectId: string) {
  const project = await findProjectById(projectId);
  const currentUser = await getCurrentUser();

  if (project) {
    await authorizeOrganizationMember({
      organizationId: project.organizationId,
      userId: currentUser.id,
      allowedRoles: [OrganizationRole.OWNER, OrganizationRole.ADMIN],
    });

    await createActivity({
      organizationId: project.organizationId,
      projectId: project.id,
      userId: currentUser.id,
      type: ActivityType.PROJECT_DELETED,
      message: `Deleted project "${project.name}"`,
    });
  }

  if (!project) throw new Error("Project not found.");

  return deleteProjectRepository(projectId);
}
