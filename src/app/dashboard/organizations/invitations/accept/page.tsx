import { AcceptInvitationScreen } from "@/features/organization/screens/accept-invitation-screen";

interface AcceptInvitationPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function AcceptInvitationPage({
  searchParams,
}: AcceptInvitationPageProps) {
  const params = await searchParams;

  return <AcceptInvitationScreen token={params.token ?? ""} />;
}
