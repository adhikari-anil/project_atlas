import { prisma } from "@/lib/prisma";
import { Session } from "../../../generated/prisma/client";

// find session by refresh token hash

export async function findSessionByRefreshToken(
  refreshTokenHash: string,
): Promise<Session | null> {
  return prisma.session.findFirst({
    where: {
      refreshTokenHash,
    },
  });
}
