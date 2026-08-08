import { Organization } from "../types/organization";
import { OrganizationCard } from "./organization-card";

interface OrganizationGridProps {
  organization: Organization[];
}

export function OrganizationGrid({ organization }: OrganizationGridProps) {
  return (
    <section
      aria-label="Organizations"
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      {organization.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </section>
  );
}
