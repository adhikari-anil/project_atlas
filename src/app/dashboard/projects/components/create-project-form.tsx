"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectSchema,
  CreateProjectInput,
} from "@/validations/project-schema";

import { createProjectAction } from "@/actions/index";

export default function CreateProjectForm({
  organizationId,
}: {
  organizationId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),

    defaultValues: {
      status: "PLANNING",
    },
  });

  async function onSubmit(data: CreateProjectInput) {
    try {
      await createProjectAction(organizationId, data);

      alert("Project created!");

      reset();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 flex max-w-xl flex-col gap-5 rounded-xl border p-8 shadow"
    >
      <h2 className="text-2xl font-bold">Create Project</h2>

      <div>
        <label>Name</label>

        <input
          {...register("name")}
          className="mt-1 w-full rounded border p-3"
        />

        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

      <div>
        <label>Description</label>

        <textarea
          {...register("description")}
          rows={5}
          className="mt-1 w-full rounded border p-3"
        />

        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      </div>

      <div>
        <label>Status</label>

        <select
          {...register("status")}
          className="mt-1 w-full rounded border p-3 bg-black text-white"
        >
          <option value="PLANNING">Planning</option>

          <option value="ACTIVE">Active</option>

          <option value="ON_HOLD">On Hold</option>

          <option value="COMPLETED">Completed</option>

          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <button
        disabled={isSubmitting}
        className="rounded bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
