"use server";
import { getOrganization } from "@/services/index";
export async function getOrganizationAction(organizationId: string) {
  return getOrganization(organizationId);
}
