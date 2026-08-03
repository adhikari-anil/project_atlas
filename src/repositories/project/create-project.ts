import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({
    data,
  });
}
