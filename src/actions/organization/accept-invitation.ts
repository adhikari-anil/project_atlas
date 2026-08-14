"use server";

import { acceptInvitation } from "@/services";

import { acceptInvitationSchema } from "@/validations/organization-membership-schema";

export async function acceptInvitationAction(token: string) {
  const validatedData = acceptInvitationSchema.parse({
    token,
  });

  return acceptInvitation(validatedData.token);
}
