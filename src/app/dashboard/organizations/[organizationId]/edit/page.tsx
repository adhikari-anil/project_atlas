import { EditOrganizationScreen } from "@/features/organization/screens/edit-organization";

interface Props {
  params: Promise<{
    organizationId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { organizationId } = await params;
  return <EditOrganizationScreen organizationId={organizationId} />;
}
