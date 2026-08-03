import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export async function updateProject(
  projectId: string,
  data: Prisma.ProjectUpdateInput,
) {
  return prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  });
}
