import { EditProjectScreen } from "@/features/project/screens/edit-project-screen";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { projectId } = await params;

  return <EditProjectScreen projectId={projectId} />;
}
