"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectSchema,
  CreateProjectInput,
  updateProjectSchema,
  UpdateProjectInput,
} from "@/validations/project-schema";

import { createProjectAction, updateProjectAction } from "@/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormProps {
  project?: {
    id: string;
    name: string;
    description: string | null;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isEditing = Boolean(project);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectInput | UpdateProjectInput>({
    resolver: zodResolver(
      isEditing ? updateProjectSchema : createProjectSchema,
    ),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
    },
  });

  async function onSubmit(data: CreateProjectInput | UpdateProjectInput) {
    setServerError("");
    setIsSubmitted(true);

    try {
      if (isEditing && project) {
        await updateProjectAction(project.id, data);
        router.push("/dashboard/projects");
      } else {
        await createProjectAction(data as CreateProjectInput);
        router.push("/dashboard/projects");
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Something went wrong.");
      }
    } finally {
      setIsSubmitted(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label>Name</label>

        <Input {...register("name")} placeholder="Project name" />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Description</label>

        <Textarea
          {...register("description")}
          rows={5}
          placeholder="Describe your project"
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isEditing
          ? isSubmitted
            ? "Editing Project..."
            : "Edit Project"
          : isSubmitted
            ? "Creating Project..."
            : "Create Project"}
      </Button>
    </form>
  );
}
