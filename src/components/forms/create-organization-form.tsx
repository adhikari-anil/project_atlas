"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createOrganizationSchema,
  CreateOrganizationInput,
} from "@/validations/organization-schema";

import { createOrganizationAction } from "@/actions/index";

export function CreateOrganizationForm() {
  const [isPending, startTransition] = useTransition();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrganizationInput>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      logoUrl: "",
    },
  });

  function onSubmit(data: CreateOrganizationInput) {
    setServerError("");

    startTransition(async () => {
      try {
        await createOrganizationAction(data);

        reset();

        alert("Organization created successfully.");
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        } else {
          setServerError("Something went wrong.");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>

        <input {...register("name")} placeholder="Acme Inc." />

        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Slug</label>

        <input {...register("slug")} placeholder="acme-inc" />

        {errors.slug && <p>{errors.slug.message}</p>}
      </div>

      <div>
        <label>Description</label>

        <textarea
          {...register("description")}
          placeholder="Organization description"
        />

        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Logo URL</label>

        <input {...register("logoUrl")} placeholder="https://..." />

        {errors.logoUrl && <p>{errors.logoUrl.message}</p>}
      </div>

      {serverError && <p>{serverError}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Organization"}
      </button>
    </form>
  );
}
