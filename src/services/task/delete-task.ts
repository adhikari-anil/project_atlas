import {
  deleteTask as deleteTaskRepository,
  findTaskById,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";

import { authorizeOrganizationMember, getCurrentUser } from "@/services/index";

import { ActivityType, OrganizationRole } from "../../../generated/prisma/enums";

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

  await createActivity({
    organizationId: task.project.organizationId,
    projectId: task.projectId,
    taskId: task.id,
    userId: currentUser.id,
    type: ActivityType.TASK_DELETED,
    message: `Deleted task "${task.title}"`,
  });

  return deleteTaskRepository(taskId);
}
