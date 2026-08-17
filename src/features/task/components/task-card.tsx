// import { Task } from "../types/task";

// interface TaskCardProps {
//   task: Task;
// }

// export function TaskCard({ task }: TaskCardProps) {
//   return (
//     <div className="rounded-xl border bg-card p-5 transition hover:shadow-md">
//       <div className="space-y-3">
//         <div className="flex items-start justify-between">
//           {/* <h3 className="font-semibold">{task.name}</h3> */}

//           <span className="rounded bg-muted px-2 py-1 text-xs">
//             {task.priority}
//           </span>
//         </div>

//         <p className="text-sm text-muted-foreground">
//           {task.description ?? "No description provided."}
//         </p>

//         <div className="flex items-center justify-between border-t pt-4">
//           <span className="text-xs text-muted-foreground">{task.status}</span>

//           <span className="text-xs text-muted-foreground">
//             {task.dueDate
//               ? new Date(task.dueDate).toLocaleDateString()
//               : "No due date"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { deleteTaskAction } from "@/actions";

import { Button } from "@/components/ui/button";

import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const params = useParams();
  const projectId = params.projectId;
  const organizationId = params.organizationId;
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }
    try {
      await deleteTaskAction(task.id);
      router.refresh();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-5 transition hover:shadow-md">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold">{task.title}</h3>

          <span className="rounded bg-muted px-2 py-1 text-xs">
            {task.priority}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {task.description ?? "No description provided."}
        </p>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-xs text-muted-foreground">{task.status}</span>

          <span className="text-xs text-muted-foreground">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </span>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Link
              href={`/dashboard/organizations/${organizationId}/projects/${projectId}/tasks/${task.id}/edit`}
            >
              Edit
            </Link>
          </Button>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
