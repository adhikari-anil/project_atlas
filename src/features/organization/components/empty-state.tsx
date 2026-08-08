import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex min-h-105 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-10 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <span className="text-4xl">🏢</span>
      </div>

      <h2 className="text-2xl font-semibold">No organizations found</h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Organizations are workspaces where your team collaborates on projects
        and tasks.
      </p>

      <Button className="mt-8">
        <Link href="/dashboard/organizations/new">Create Organization</Link>
      </Button>
    </div>
  );
}
