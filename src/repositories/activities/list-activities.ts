import { prisma } from "@/lib/prisma";

interface ListActivitiesInput {
  organizationId?: string;
  organizationIds?: string[];
  projectId?: string;
  taskId?: string;
  userId?: string;

  take?: number;
}

export async function listActivities({
  organizationId,
  organizationIds,
  projectId,
  taskId,
  userId,
  take,
}: ListActivitiesInput) {
  return prisma.activity.findMany({
    where: {
      ...(organizationId && {
        organizationId,
      }),

      ...(organizationIds && {
        organizationId: {
          in: organizationIds,
        },
      }),

      ...(projectId && {
        projectId,
      }),

      ...(taskId && {
        taskId,
      }),

      ...(userId && {
        userId,
      }),
    },

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

    orderBy: {
      createdAt: "desc",
    },

    take,
  });
}
