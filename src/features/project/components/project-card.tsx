import Link from "next/link";
import { FolderKanban } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { ProjectCardData } from "../types/project";

type Props = {
  project: ProjectCardData;
};

export function ProjectCard({ project }: Props) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary">
        <CardHeader className="flex flex-row items-start gap-3">
          <FolderKanban className="mt-1 h-5 w-5 text-primary" />

          <div className="flex-1">
            <CardTitle>{project.name}</CardTitle>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <Badge>{project.status}</Badge>

          <span className="text-xs text-muted-foreground">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
