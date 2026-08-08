import { listOrganizations, listProjects, listTasks } from "@/services";

export async function DashboardScreen() {
  const organizations = await listOrganizations();

  const projects = await listProjects();

  const taskResults = await Promise.all(
    projects.map((project) => listTasks(project.id)),
  );

  const tasks = taskResults.flat();

  const completedTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Heres your project overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Organizations"
          value={organizations.length}
        />

        <DashboardCard title="Active Projects" value={projects.length} />

        <DashboardCard title="Total Tasks" value={tasks.length} />

        <DashboardCard title="Completed" value={completedTasks.length} />
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>

        <p className="mt-4 text-sm text-muted-foreground">
          Activity feed coming soon...
        </p>
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
