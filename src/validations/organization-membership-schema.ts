import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z.string().email("Please provide a valid email address."),

  role: z.enum(["ADMIN", "MEMBER"]),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;

export const acceptInvitationSchema = z.object({
  token: z.string().min(1, "Invitation token is required."),
});

export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;

export const userIdSchema = z.object({
  userId: z.string().uuid("Invalid user id."),
});

export type UserIdInput = z.infer<typeof userIdSchema>;
