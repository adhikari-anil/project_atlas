import { prisma } from "@/lib/prisma";
import { Prisma, User } from "../../../generated/prisma/client";

// create a new user...

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return prisma.user.create({
    data,
  });
}
