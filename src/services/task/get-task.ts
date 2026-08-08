import { findTaskById } from "@/repositories";

import { authorizeOrganizationMember, getCurrentUser } from "@/services";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function getTask(taskId: string) {
  const currentUser = await getCurrentUser();
  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found.");
  }

  await authorizeOrganizationMember({
    organizationId: task.project.organizationId,
    userId: currentUser.id,
    allowedRoles: [
      OrganizationRole.OWNER,
      OrganizationRole.ADMIN,
      OrganizationRole.MEMBER,
    ],
  });

  return task;
}
