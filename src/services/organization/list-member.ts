import { listOrganizationMembers } from "@/repositories";

import { getCurrentOrganization } from "@/services";

export async function listMembers() {
  const organizationId = await getCurrentOrganization();

  return listOrganizationMembers(organizationId);
}
