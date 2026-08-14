"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { leaveOrganizationAction } from "@/actions";

import { Button } from "@/components/ui/button";

export function LeaveOrganizationButton() {
  const router = useRouter();

  const [isLeaving, setIsLeaving] = useState(false);

  async function handleLeave() {
    const confirmed = window.confirm(
      "Are you sure you want to leave this organization?",
    );

    if (!confirmed) {
      return;
    }

    setIsLeaving(true);

    try {
      await leaveOrganizationAction();

      router.push("/dashboard/organizations");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setIsLeaving(false);
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isLeaving}
      onClick={handleLeave}
    >
      {isLeaving ? "Leaving..." : "Leave Organization"}
    </Button>
  );
}
