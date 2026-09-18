import {
  listOrganizations,
  listProjects,
  listTasks,
  listActivities,
} from "@/services";
import { RecentActivitiesFeed } from "@/components/realTime/recent-activities-feed";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export async function DashboardScreen() {
  const organizations = await listOrganizations();

  let projects: Awaited<ReturnType<typeof listProjects>> = [];
  try {
    projects = await listProjects();
  } catch {
    projects = [];
  }

  const taskResults = await Promise.all(
    projects.map((project) => listTasks(project.id).catch(() => [])),
  );

  const tasks = taskResults.flat();
  const completedTasks = tasks.filter((task) => task.status === "DONE");

  let activities: Awaited<ReturnType<typeof listActivities>> = [];
  try {
    activities = await listActivities({ take: 20 });
  } catch {
    activities = [];
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here is your workspace and activity overview.
        </p>
      </div>

      {organizations.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center bg-card">
          <Building2 className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold">No Organizations Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1 mb-4">
            Get started by creating your first organization workspace to manage projects and tasks.
          </p>
          <Link
            href="/dashboard/organizations/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Create Organization <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Organizations"
            value={organizations.length}
          />
          <DashboardCard title="Active Projects" value={projects.length} />
          <DashboardCard title="Total Tasks" value={tasks.length} />
          <DashboardCard title="Completed Tasks" value={completedTasks.length} />
        </div>
      )}

      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Live Activity Stream</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time events across your organizations
            </p>
          </div>
        </div>

        <div className="pt-4">
          <RecentActivitiesFeed initialActivities={activities} />
        </div>
      </div>
    </main>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
}

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-3 text-3xl font-bold">{value}</p>
    </div>
  );
}
