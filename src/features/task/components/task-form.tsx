"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createTaskSchema,
  UpdateTaskInput,
  updateTaskSchema,
  type CreateTaskInput,
} from "@/validations/task-schema";

import { createTaskAction, updateTaskAction } from "@/actions";

import { Button } from "@/components/ui/button";

interface TaskFormProps {
  projectId: string;

  task?: {
    id: string;
    title: string;
    description: string | null;
    status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | undefined;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | undefined;
    dueDate: Date | null;
  };
}

export function TaskForm({ projectId, task }: TaskFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(task);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskInput | UpdateTaskInput>({
    resolver: zodResolver(isEditing ? updateTaskSchema : createTaskSchema),

    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "TODO",
      priority: task?.priority ?? "MEDIUM",
      dueDate: task?.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    },
  });

  useEffect(() => {
    if (!task) {
      return;
    }

    reset({
      title: task.title,
      description: task.description ?? "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });
  }, [task, reset]);

  async function onSubmit(data: CreateTaskInput | UpdateTaskInput) {
    setIsSubmitting(true);
    try {
      if (isEditing && task) {
        await updateTaskAction(task.id, data as UpdateTaskInput);

        router.push(`/dashboard/projects/${projectId}`);
      } else {
        await createTaskAction(projectId, data as CreateTaskInput);

        router.push(`/dashboard/projects/${projectId}`);
      }
    } catch (error) {
      console.log("Issue while submitting task form: ", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("TASK FORM VALIDATION ERRORS:", errors);
      })}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Task Title</label>

        <input
          {...register("title")}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Implement Login Page"
        />

        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          rows={5}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Describe the task..."
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>

          <select
            {...register("status")}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="TODO">TODO</option>

            <option value="IN_PROGRESS">IN PROGRESS</option>

            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>

          <select
            {...register("priority")}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="LOW">LOW</option>

            <option value="MEDIUM">MEDIUM</option>

            <option value="HIGH">HIGH</option>

            <option value="URGENT">URGENT</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Due Date</label>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}
