import { OrganizationLiveUpdatesScreen } from "@/features/organization";

export default async function OrganizationUpdatesPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;
  return <OrganizationLiveUpdatesScreen organizationId={organizationId} />;
}
