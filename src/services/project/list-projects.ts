import { listProjectsByOrganization } from "@/repositories";

export async function listProjects(organizationId: string) {
  return listProjectsByOrganization(organizationId);
}
