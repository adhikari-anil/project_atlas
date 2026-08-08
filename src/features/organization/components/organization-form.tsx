"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createOrganizationAction } from "@/actions";

import {
  createOrganizationSchema,
  type CreateOrganizationInput,
} from "@/validations/organization-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function OrganizationForm() {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrganizationInput>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateOrganizationInput) => {
    setIsSubmitted(true);

    try {
      const result = await createOrganizationAction(data);

      if (!result) {
        alert("Problem in creating organization");
        return;
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
        {isSubmitted ? "Creating Organization..." : "Create Organization"}
      </Button>
    </form>
  );
}
