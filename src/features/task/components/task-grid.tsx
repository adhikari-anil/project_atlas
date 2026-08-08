import { Task } from "../types/task";

import { TaskCard } from "./task-card";

interface TaskGridProps {
  tasks: Task[];
}

export function TaskGrid({ tasks }: TaskGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
