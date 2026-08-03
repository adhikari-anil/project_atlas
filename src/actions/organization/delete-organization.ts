"use server";
import { deleteOrganization } from "@/services/index";
export async function deleteOrganizationAction(organizationId: string) {
  return deleteOrganization(organizationId);
}
