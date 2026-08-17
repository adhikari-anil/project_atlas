import { ProjectListScreen } from "@/features/project/screens/project-list-screen";

// export default function ProjectsPage() {
//   return <ProjectListScreen />;
// }

export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return <ProjectListScreen organizationId={organizationId} />;
}
