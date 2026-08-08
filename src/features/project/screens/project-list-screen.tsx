import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/shared/page-header";

import { listProjects } from "@/services";

import { EmptyState } from "../components/empty-state";
import { ProjectGrid } from "../components/project-grid";

export async function ProjectListScreen() {
  const projects = await listProjects();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="Manage projects inside your current organization."
      >
        <Button>
          <Link href="/dashboard/projects/new">New Project</Link>
        </Button>
      </PageHeader>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  );
}
