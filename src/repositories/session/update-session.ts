import { prisma } from "@/lib/prisma";
import { Prisma, Session } from "../../../generated/prisma/client";

// update session

export async function updateSession(
  id: string,
  data: Prisma.SessionUpdateInput,
): Promise<Session> {
  return prisma.session.update({
    where: {
      id,
    },
    data,
  });
}
