import { prisma } from "@/lib/prisma";
import { Session } from "../../../generated/prisma/client";

// Delete Session

export async function deleteSession(id: string): Promise<Session> {
  return prisma.session.delete({
    where: {
      id,
    },
  });
}
