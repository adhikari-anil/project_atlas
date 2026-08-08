import { getTask } from "@/services";

import { TaskForm } from "../components/task-form";

interface EditTaskScreenProps {
  projectId: string;
  taskId: string;
}

export async function EditTaskScreen({
  projectId,
  taskId,
}: EditTaskScreenProps) {
  const task = await getTask(taskId);

  if (!task) {
    throw new Error("Task not found.");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Edit Task</h1>

        <p className="mt-2 text-muted-foreground">Update the task details.</p>
      </div>

      <TaskForm
        projectId={projectId}
        task={{
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }}
      />
    </div>
  );
}
