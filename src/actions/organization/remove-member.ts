"use server";

import { removeMember } from "@/services";

import { userIdSchema } from "@/validations/organization-membership-schema";

export async function removeMemberAction(userId: string) {
  const validatedData = userIdSchema.parse({
    userId,
  });

  return removeMember(validatedData.userId);
}
