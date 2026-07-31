import { prisma } from "@/lib/prisma";
import { User } from "../../../generated/prisma/client";

// Find user by UserName

export async function findUserByUsername(
  username: string,
): Promise<User | null> {
  return prisma.user.findUnique({
    where: { username: username },
  });
}
