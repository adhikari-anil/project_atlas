"use client";
import Link from "next/link";
import { FolderKanban } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { ProjectCardData } from "../types/project";
import { Button } from "@/components/ui/button";
import { deleteProjectAction } from "@/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  project: ProjectCardData;
};

export function ProjectCard({ project }: Props) {
  const [isDeletePending, setIsDeletePending] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsDeletePending(true);
    const confirmed = window.confirm(
      "Are you sure you want to delete this Organization?",
    );

    if (!confirmed) {
      return;
    }
    try {
      await deleteProjectAction(project.id);
      router.refresh();
    } catch (error) {
      console.log("Error while Deleting Project: ", error);
    } finally {
      setIsDeletePending(false);
    }
  }

  function handleSelect() {
    setIsPending(true);
    try {
      router.push(`/dashboard/projects/${project.id}`);
    } catch (error) {
      console.log("Error while visiting listTaskScreen: ", error);
    } finally {
      setIsPending(true);
    }
  }

  return (
    <div className="group w-full text-left">
      <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary p-4">
        <div className="flex gap-2 justify-between">
          <div>
            <Badge>{project.status}</Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Link href={`/dashboard/projects/${project.id}/edit`}>Edit</Link>
            </Button>

            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleDelete}
            >
              {isDeletePending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
        <CardHeader className="flex flex-row justify-between gap-3">
          <div className="flex flex-row gap-2 items-center justify-center">
            <FolderKanban className="mt-1 h-5 w-5 text-primary" />
            <CardTitle className="flex text-center">{project.name}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </CardHeader>

        <CardContent className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>
          <span className="text-sm font-medium text-blue-600 transition group-hover:translate-x-1">
            <button onClick={handleSelect}>
              {isPending ? "Opening..." : "Open"} →
            </button>
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
