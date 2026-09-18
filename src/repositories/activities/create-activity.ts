import { prisma } from "@/lib/prisma";

import { ActivityType } from "../../../generated/prisma/enums";

interface CreateActivityInput {
  organizationId: string;
  projectId?: string;
  taskId?: string;
  userId: string;

  type: ActivityType;

  message?: string;
}

export async function createActivity(data: CreateActivityInput) {
  return prisma.activity.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },

      organization: {
        select: {
          id: true,
          name: true,
        },
      },

      project: {
        select: {
          id: true,
          name: true,
        },
      },

      task: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}
