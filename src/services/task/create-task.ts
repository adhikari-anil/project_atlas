import {
  createTask as createTaskRepository,
  findProjectById,
  findOrganizationMember,
} from "@/repositories/index";

import { CreateTaskInput } from "@/validations/task-schema";

import { getCurrentUser, authorizeOrganizationMember } from "@/services/index";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function createTask(projectId: string, data: CreateTaskInput) {
  const currentUser = await getCurrentUser();

  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  // Authorize Membership...

  await authorizeOrganizationMember({
    organizationId: project.organizationId,
    userId: currentUser.id,
    allowedRoles: [
      OrganizationRole.OWNER,
      OrganizationRole.ADMIN,
      OrganizationRole.MEMBER,
    ],
  });

  // Validate Assignee.....

  if (data.assignedToId) {
    const assignee = await findOrganizationMember(
      project.organizationId,
      data.assignedToId,
    );

    if (!assignee) {
      throw new Error("Assigned user is not a member of this organization.");
    }
  }

  return createTaskRepository({
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate,

    project: {
      connect: {
        id: projectId,
      },
    },

    createdBy: {
      connect: {
        id: currentUser.id,
      },
    },

    assignedTo: data.assignedToId
      ? {
          connect: {
            id: data.assignedToId,
          },
        }
      : undefined,
  });
}
