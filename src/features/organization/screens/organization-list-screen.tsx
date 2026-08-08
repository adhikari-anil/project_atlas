import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";

import { listOrganizations } from "@/services";

import { EmptyState } from "../components/empty-state";
import { OrganizationGrid } from "../components/organization-grid";

export async function OrganizationListScreen() {
  const organizations = await listOrganizations();

  return (
    <div className="space-y-8">
      <PageHeader title="Organizations" description="Manage your workspaces.">
        <Button>
          <Link href="/dashboard/organizations/new">Create Organization</Link>
        </Button>
      </PageHeader>

      {organizations.length === 0 ? (
        <EmptyState />
      ) : (
        <OrganizationGrid
          organization={organizations.map((o) => o.organization)}
        />
      )}
    </div>
  );
}
