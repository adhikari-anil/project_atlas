import { Organization } from "../types/organization";
import { OrganizationCard } from "./organization-card";

type OrganizationWithRole = {
  organization: Organization;
  role: string;
};

interface OrganizationGridProps {
  organization: OrganizationWithRole[];
}

export function OrganizationGrid({ organization }: OrganizationGridProps) {
  return (
    <section
      aria-label="Organizations"
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      {organization.map((organization) => (
        <OrganizationCard
          key={organization.organization.id}
          organization={organization.organization}
          role={organization.role}
        />
      ))}
    </section>
  );
}
