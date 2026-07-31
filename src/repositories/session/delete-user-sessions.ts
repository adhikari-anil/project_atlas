import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

// delete all session for a user

export async function deleteUserSession(
  userId: string,
): Promise<Prisma.BatchPayload> {
  return prisma.session.deleteMany({
    where: { userId },
  });
}
