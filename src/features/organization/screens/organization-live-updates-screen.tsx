import { getOrganization, listActivities } from "@/services";
import { PageHeader } from "@/components/shared/page-header";
import { RecentActivitiesFeed } from "@/components/realTime/recent-activities-feed";
import { PostTeamUpdateForm } from "../components/post-team-update-form";
import { notFound } from "next/navigation";

interface LiveUpdatesScreenProps {
  organizationId: string;
}

export async function OrganizationLiveUpdatesScreen({
  organizationId,
}: LiveUpdatesScreenProps) {
  const organization = await getOrganization(organizationId).catch(() => null);
  if (!organization) notFound();

  let activities: Awaited<ReturnType<typeof listActivities>> = [];
  try {
    activities = await listActivities({ organizationId, take: 50 });
  } catch {
    activities = [];
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${organization.name} - Live Stream`}
        description="Real-time collaboration feed, task completions, and team announcements."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <PostTeamUpdateForm organizationId={organizationId} />

          <div className="rounded-xl border bg-card p-5 text-sm space-y-3">
            <h4 className="font-semibold text-foreground">About Real-Time Feed</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Updates posted here and system events (such as created tasks, completed items, or new team members) are broadcast instantly to all connected team members in this organization via WebSockets.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="text-lg font-semibold">Activity Timeline</h3>
            </div>

            <div className="pt-4">
              <RecentActivitiesFeed
                initialActivities={activities}
                organizationId={organizationId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
