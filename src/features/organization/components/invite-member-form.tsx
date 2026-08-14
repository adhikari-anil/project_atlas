"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inviteMemberAction } from "@/actions";
import {
  inviteMemberSchema,
  type InviteMemberInput,
} from "@/validations/organization-membership-schema";

import { Button } from "@/components/ui/button";

export function InviteMemberForm() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "MEMBER",
    },
  });

  async function onSubmit(data: InviteMemberInput) {
    setServerError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await inviteMemberAction(data);

      setSuccessMessage("Invitation created successfully.");

      reset();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-lg border bg-white p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">Invite Member</h2>

        <p className="mt-1 text-sm text-gray-500">
          Invite someone to join this organization.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="member@example.com"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">
          Role
        </label>

        <select
          id="role"
          {...register("role")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="MEMBER">Member</option>

          <option value="ADMIN">Admin</option>
        </select>

        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </p>
      )}

      {successMessage && (
        <p className="rounded-md bg-green-50 p-3 text-sm text-green-600">
          {successMessage}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Invite Member"}
      </Button>
    </form>
  );
}
