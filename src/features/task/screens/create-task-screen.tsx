import { TaskForm } from "../components/task-form";

interface CreateTaskScreenProps {
  projectId: string;
}

export function CreateTaskScreen({ projectId }: CreateTaskScreenProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Task</h1>

        <p className="mt-2 text-muted-foreground">
          Add a new task to this project.
        </p>
      </div>

      <TaskForm projectId={projectId} />
    </div>
  );
}
