import { z } from "zod";

export const changeMemberRoleSchema = z.object({
  userId: z.string().uuid("Invalid user id."),
  role: z.enum(["ADMIN", "MEMBER"]),
});

export type ChangeMemberRoleSchemaInput = z.infer<
  typeof changeMemberRoleSchema
>;
