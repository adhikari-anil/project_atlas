"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { removeMemberAction } from "@/actions";

import { Button } from "@/components/ui/button";

interface RemoveMemberButtonProps {
  userId: string;
}

export function RemoveMemberButton({ userId }: RemoveMemberButtonProps) {
  const router = useRouter();

  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemove() {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member?",
    );

    if (!confirmed) {
      return;
    }

    setIsRemoving(true);

    try {
      await removeMemberAction(userId);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isRemoving}
      onClick={handleRemove}
    >
      {isRemoving ? "Removing..." : "Remove"}
    </Button>
  );
}
