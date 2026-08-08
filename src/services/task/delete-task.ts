import {
  deleteTask as deleteTaskRepository,
  findTaskById,
} from "@/repositories";

import { authorizeOrganizationMember, getCurrentUser } from "@/services/index";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function deleteTask(taskId: string) {
  const currentUser = await getCurrentUser();

  const task = await findTaskById(taskId);

  if (!task) {
    throw new Error("Task not found.");
  }

  await authorizeOrganizationMember({
    organizationId: task.project.organizationId,
    userId: currentUser.id,
    allowedRoles: [OrganizationRole.OWNER, OrganizationRole.ADMIN],
  });

  return deleteTaskRepository(taskId);
}
