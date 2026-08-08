import Link from "next/link";

import { Button } from "@/components/ui/button";

import { listTasks } from "@/services";

import { EmptyState } from "../components/empty-state";
import { TaskGrid } from "../components/task-grid";

interface TaskListScreenProps {
  projectId: string;
}

export async function TaskListScreen({ projectId }: TaskListScreenProps) {
  const tasks = await listTasks(projectId);

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No Tasks Yet"
        description="Create your first task for this project."
        buttonLabel="Create Task"
        href={`/dashboard/projects/${projectId}/tasks/new`}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Tasks</h2>

          <p className="text-muted-foreground">
            Manage all tasks inside this project.
          </p>
        </div>

        <Button>
          <Link href={`/dashboard/projects/${projectId}/tasks/new`}>
            New Task
          </Link>
        </Button>
      </div>

      <TaskGrid tasks={tasks} />
    </div>
  );
}
