import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Create Task
|--------------------------------------------------------------------------
*/

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Task title must be at least 3 characters.")
    .max(200, "Task title cannot exceed 200 characters."),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters.")
    .optional()
    .or(z.literal("")),

  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),

  assignedToId: z.string().uuid("Invalid user id.").optional(),

  dueDate: z.string().date().optional(),
});

export type CreateTaskInput = z.input<typeof createTaskSchema>;

export type CreateTaskOutput = z.output<typeof createTaskSchema>;

/*
|--------------------------------------------------------------------------
| Update Task
|--------------------------------------------------------------------------
*/

export const updateTaskSchema = createTaskSchema.partial();

export type UpdateTaskInput = z.input<typeof updateTaskSchema>;

export type UpdateTaskOutput = z.output<typeof updateTaskSchema>;

/*
|--------------------------------------------------------------------------
| Task ID
|--------------------------------------------------------------------------
*/

export const taskIdSchema = z.object({
  taskId: z.string().uuid("Invalid task id."),
});

export type TaskIdInput = z.input<typeof taskIdSchema>;
export type TaskIdOutput = z.output<typeof taskIdSchema>;
