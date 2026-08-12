import { getOrganization } from "@/services";
import { OrganizationForm } from "../components/organization-form";

interface Organization {
  organizationId: string;
}
export async function EditOrganizationScreen({ organizationId }: Organization) {
  const organization = await getOrganization(organizationId);
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Edit Organization</h1>

        <p className="mt-2 text-muted-foreground">
          Update the Organization details.
        </p>
      </div>

      <OrganizationForm organization={organization} />
    </div>
  );
}
