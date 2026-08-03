"use server";
import { updateOrganizationSchema } from "@/validations/organization-schema";
import { updateOrganization } from "@/services/index";
export async function updateOrganizationAction(
  organizationId: string,
  data: unknown,
) {
  const validated = updateOrganizationSchema.parse(data);
  return updateOrganization(organizationId, validated);
}
