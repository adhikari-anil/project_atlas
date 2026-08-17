import { TaskListScreen } from "@/features/task";

interface Props {
  params: Promise<{
    projectId: string;
    organizationId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { projectId, organizationId } = await params;

  return (
    <TaskListScreen projectId={projectId} organizationId={organizationId} />
  );
}
