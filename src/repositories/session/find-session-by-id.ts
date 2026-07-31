import { prisma } from "@/lib/prisma";

export async function findSessionById(id: string) {
  return prisma.session.findUnique({
    where: {
      id,
    },
  });
}
