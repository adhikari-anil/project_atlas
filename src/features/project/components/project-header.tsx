import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCardData } from "../types/project";

interface ProjectHeaderProps {
  project: ProjectCardData;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-8">
      <Button variant="ghost">
        <Link href="/dashboard/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>

        <p className="max-w-3xl text-muted-foreground">
          {project.description ?? "No description has been added yet."}
        </p>
      </div>

      <div className="grid gap-6 rounded-xl border bg-card p-6 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Status</p>

          <p className="mt-1 font-medium capitalize">{project.status}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Created</p>

          <p className="mt-1 font-medium">
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
