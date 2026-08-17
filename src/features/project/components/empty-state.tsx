"use client";

import Link from "next/link";

import { FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export function EmptyState() {
  const { organizationId } = useParams();
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
      <FolderKanban className="mb-6 h-14 w-14 text-muted-foreground" />

      <h2 className="text-xl font-semibold">No projects yet</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Create your first project to start organizing tasks and collaborating
        with your team.
      </p>

      <Button className="mt-8">
        <Link href={`/dashboard/organizations/${organizationId}/projects/new`}>
          Create Project
        </Link>
      </Button>
    </div>
  );
}
