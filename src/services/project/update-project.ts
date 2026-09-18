import {
  findProjectById,
  updateProject as updateProjectRepository,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";
import { authorizeOrganizationMember, getCurrentUser } from "@/services";
import { ActivityType, OrganizationRole } from "../../../generated/prisma/enums";

import { UpdateProjectInput } from "@/validations/project-schema";

export async function updateProject(
  projectId: string,
  data: UpdateProjectInput,
) {
  const [currentUser, project] = await Promise.all([
    getCurrentUser(),
    findProjectById(projectId),
  ]);

  if (!project) throw new Error("Project not found.");

  await authorizeOrganizationMember({
    organizationId: project.organizationId,
    userId: currentUser.id,
    allowedRoles: [OrganizationRole.OWNER, OrganizationRole.ADMIN],
  });

  const updatedProject = await updateProjectRepository(projectId, data);

  await createActivity({
    organizationId: project.organizationId,
    projectId,
    userId: currentUser.id,
    type: ActivityType.PROJECT_UPDATED,
    message: `Updated project "${updatedProject.name}"`,
  });

  return updatedProject;
}
