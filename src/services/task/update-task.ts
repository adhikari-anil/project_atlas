import {
  updateTask as updateTaskRepository,
  findTaskById,
  findOrganizationMember,
} from "@/repositories";

import { authorizeOrganizationMember, getCurrentUser } from "@/services/index";

import { UpdateTaskInput } from "@/validations/task-schema";
import { OrganizationRole } from "../../../generated/prisma/enums";

export async function updateTask(taskId: string, data: UpdateTaskInput) {
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

  if (data.assignedToId) {
    const assignee = await findOrganizationMember(
      task.project.organizationId,
      data.assignedToId,
    );

    if (!assignee) {
      throw new Error("Assigned user is not a member of this organization.");
    }
  }

  return updateTaskRepository(taskId, {
    ...data,
    dueDate: data.dueDate ? new Date(`${data.dueDate}T00:00:00.000Z`) : null,
    assignedTo: data.assignedToId
      ? {
          connect: {
            id: data.assignedToId,
          },
        }
      : undefined,
  });
}
