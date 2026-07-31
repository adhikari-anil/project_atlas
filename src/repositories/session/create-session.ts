import { prisma } from "@/lib/prisma";
import { Prisma, Session } from "../../../generated/prisma/client";

// create sessions

export async function createSession(
  data: Prisma.SessionCreateInput,
): Promise<Session> {
  return prisma.session.create({
    data,
  });
}
