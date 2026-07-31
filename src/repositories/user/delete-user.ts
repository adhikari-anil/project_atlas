import { prisma } from "@/lib/prisma";
import { User } from "../../../generated/prisma/client";

// Delete User

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}
