import { prisma } from "@/lib/prisma";
import { Prisma, User } from "../../../generated/prisma/client";

// update user

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput,
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data,
  });
}
