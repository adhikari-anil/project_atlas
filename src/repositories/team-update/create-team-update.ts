import { prisma } from "@/lib/prisma";
import { TeamUpdateType } from "../../../generated/prisma/enums";

interface CreateTeamUpdateRepoInput {
  organizationId: string;
  userId: string;
  message: string;
  type?: TeamUpdateType;
  taskId?: string;
}

export async function createTeamUpdate(data: CreateTeamUpdateRepoInput) {
  return prisma.teamUpdate.create({
    data: {
      organizationId: data.organizationId,
      userId: data.userId,
      message: data.message,
      type: data.type || "GENERAL",
      ...(data.taskId && { taskId: data.taskId }),
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          email: true,
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
