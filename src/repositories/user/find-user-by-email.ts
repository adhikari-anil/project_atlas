import { prisma } from "@/lib/prisma";
import { User } from "../../../generated/prisma/client";

// Find user by email

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}
