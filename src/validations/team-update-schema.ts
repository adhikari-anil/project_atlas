import { z } from "zod";

export const createTeamUpdateSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Update message cannot be empty.")
    .max(1000, "Update message cannot exceed 1000 characters."),

  type: z.enum(["GENERAL", "TASK_UPDATE", "BLOCKER"]).default("GENERAL"),

  taskId: z.string().uuid("Invalid task id.").optional().or(z.literal("")),
});

export type CreateTeamUpdateInput = z.infer<typeof createTeamUpdateSchema>;
