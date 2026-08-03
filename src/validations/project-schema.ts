import z from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters.")
    .max(150, "Project name cannot exceed 150 characters."),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),

  status: z
    .enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "ARCHIVED"])
    .optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

// Update Project

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

// ProjectId

export const projectIdSchema = z.object({
  projectId: z.string().uuid("Invalid project id."),
});

export type ProjectIdInput = z.infer<typeof projectIdSchema>;
