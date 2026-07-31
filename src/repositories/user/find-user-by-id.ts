import { prisma } from "@/lib/prisma";
import { User } from "../../../generated/prisma/client";

// Find user by ID

export async function findById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}
