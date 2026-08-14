"use server";

import { inviteMember } from "@/services";

import { inviteMemberSchema } from "@/validations/organization-membership-schema";

export async function inviteMemberAction(data: unknown) {
  const validatedData = inviteMemberSchema.parse(data);

  return inviteMember(validatedData);
}
