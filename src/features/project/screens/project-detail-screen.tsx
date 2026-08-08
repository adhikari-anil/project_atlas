import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getProject, listTasks } from "@/services";

import { EmptyState } from "@/features/task/components/empty-state";
import { TaskGrid } from "@/features/task/components/task-grid";

import { ProjectHeader } from "../components/project-header";

interface ProjectDetailScreenProps {
  projectId: string;
}

export async function ProjectDetailScreen({
  projectId,
}: ProjectDetailScreenProps) {
  const project = await getProject(projectId);

  const tasks = await listTasks(projectId);

  return (
    <div className="space-y-10">
      <ProjectHeader project={project} />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Tasks</h2>

            <p className="text-muted-foreground">
              Manage all tasks inside this project.
            </p>
          </div>

          <Button>
            <Link href={`/dashboard/projects/${project.id}/tasks/new`}>
              New Task
            </Link>
          </Button>
        </div>

        {tasks.length === 0 ? (
          <EmptyState
            title="No Tasks Yet"
            description="Create your first task to start tracking work."
            buttonLabel="Create Task"
            href={`/dashboard/projects/${project.id}/tasks/new`}
          />
        ) : (
          <TaskGrid tasks={tasks} />
        )}
      </section>
    </div>
  );
}
