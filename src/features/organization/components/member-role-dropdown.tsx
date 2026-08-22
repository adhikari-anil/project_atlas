"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { changeMemberRoleAction } from "@/actions";

type OrganizationRole = "OWNER" | "ADMIN" | "MEMBER";

interface MemberRoleDropdownProps {
  organizationId: string;
  userId: string;
  currentUserId: string;
  currentRole: OrganizationRole;
  currentUserRole: OrganizationRole;
}

export function MemberRoleDropdown({
  organizationId,
  userId,
  currentUserId,
  currentRole,
  currentUserRole,
}: MemberRoleDropdownProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");

  // Owner cannot be modified.
  if (currentRole === "OWNER") {
    return null;
  }

  // Members cannot modify roles.
  if (currentUserRole === "MEMBER") {
    return null;
  }

  // Users cannot change their own role.
  if (userId === currentUserId) {
    return null;
  }

  // Admins can only modify members.
  if (currentUserRole === "ADMIN" && currentRole !== "MEMBER") {
    return null;
  }

  function handleChangeRole(role: "ADMIN" | "MEMBER") {
    if (role === currentRole) {
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        await changeMemberRoleAction(organizationId, {
          userId,
          role,
        });

        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to change member role.");
        }
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={currentRole}
        disabled={isPending}
        onChange={(event) =>
          handleChangeRole(event.target.value as "ADMIN" | "MEMBER")
        }
        className="rounded-md border bg-white px-3 py-2 text-sm"
      >
        <option value="MEMBER">MEMBER</option>

        <option value="ADMIN">ADMIN</option>
      </select>

      {isPending && <span className="text-xs text-gray-500">Updating...</span>}

      {error && (
        <span className="max-w-40 text-right text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
