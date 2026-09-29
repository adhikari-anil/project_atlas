import { listProjectsByOrganization } from "@/repositories";
import { getCurrentOrganization } from "../organization/get-current-organization";

export async function listProjects(organizationIdOverride?: string) {
  const organizationId =
    organizationIdOverride ?? (await getCurrentOrganization());

  if (!organizationId) {
    throw new Error("No organization selected.");
  }
  return listProjectsByOrganization(organizationId);
}
