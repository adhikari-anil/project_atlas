import { EditTaskScreen } from "@/features/task/screens/edit-task";

interface Props {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { projectId, taskId } = await params;

  return <EditTaskScreen projectId={projectId} taskId={taskId} />;
}
