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
  userIdOverride?: string,
) {
  const [userId, project] = await Promise.all([
    userIdOverride ?? getCurrentUser().then((user) => user.id),
    findProjectById(projectId),
  ]);

  if (!project) throw new Error("Project not found.");

  await authorizeOrganizationMember({
    organizationId: project.organizationId,
    userId,
    allowedRoles: [OrganizationRole.OWNER, OrganizationRole.ADMIN],
  });

  const updatedProject = await updateProjectRepository(projectId, data);

  await createActivity({
    organizationId: project.organizationId,
    projectId,
    userId,
    type: ActivityType.PROJECT_UPDATED,
    message: `Updated project "${updatedProject.name}"`,
  });

  return updatedProject;
}
