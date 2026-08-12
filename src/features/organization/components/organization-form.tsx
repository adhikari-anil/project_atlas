"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createOrganizationAction, updateOrganizationAction } from "@/actions";

import {
  createOrganizationSchema,
  UpdateOrganizationInput,
  updateOrganizationSchema,
  type CreateOrganizationInput,
} from "@/validations/organization-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface OrganizationProps {
  organization?: {
    id: string;
    name: string;
    description: string | null;
    logoUrl?: string | null;
  };
}

export function OrganizationForm({ organization }: OrganizationProps) {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const isEditing = Boolean(organization);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrganizationInput | UpdateOrganizationInput>({
    resolver: zodResolver(
      isEditing ? updateOrganizationSchema : createOrganizationSchema,
    ),
    defaultValues: {
      name: organization?.name ?? "",
      description: organization?.description ?? "",
      logoUrl: organization?.logoUrl ?? "",
    },
  });

  useEffect(() => {
    if (!organization) {
      return;
    }

    reset({
      name: organization?.name ?? "",
      description: organization?.description ?? "",
      logoUrl: organization?.logoUrl ?? "",
    });
  }, [organization, reset]);

  const onSubmit = async (
    data: CreateOrganizationInput | UpdateOrganizationInput,
  ) => {
    setIsSubmitted(true);

    try {
      if (isEditing && organization) {
        const result = await updateOrganizationAction(organization.id, data);

        if (!result) {
          alert("Problem in updating organization");
          return;
        }
      } else {
        const result = await createOrganizationAction(data);

        if (!result) {
          alert("Problem in creating organization");
          return;
        }
      }
      reset();
      router.push("/dashboard/organizations");
    } catch (error) {
      console.log("Error conducting transactions...", error);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Organization Name</label>

        <Input placeholder="Acme Pvt. Ltd." {...register("name")} />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>

        <Textarea
          rows={5}
          placeholder="Tell us a little about your organization..."
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitted} className="w-full">
        {isEditing
          ? isSubmitted
            ? "Editing Organization..."
            : "Edit Organization"
          : isSubmitted
            ? "Creating Organization..."
            : "Create Organization"}
      </Button>
    </form>
  );
}
