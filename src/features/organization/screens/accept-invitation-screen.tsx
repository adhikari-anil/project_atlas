"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { acceptInvitationAction } from "@/actions";
import { Button } from "@/components/ui/button";

interface AcceptInvitationScreenProps {
  token: string;
}

export function AcceptInvitationScreen({ token }: AcceptInvitationScreenProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  async function handleAccept() {
    setError("");
    setIsSubmitting(true);

    try {
      await acceptInvitationAction(token);

      router.push("/dashboard/organizations");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-100 items-center justify-center p-6">
        <div className="rounded-lg border bg-white p-8">
          <h1 className="text-xl font-semibold">Invalid Invitation</h1>

          <p className="mt-2 text-sm text-gray-500">
            No invitation token was provided.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-100 items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-8">
        <div>
          <h1 className="text-2xl font-bold">Organization Invitation</h1>

          <p className="mt-2 text-sm text-gray-500">
            You have been invited to join an organization.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          type="button"
          onClick={handleAccept}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Accepting..." : "Accept Invitation"}
        </Button>
      </div>
    </main>
  );
}
