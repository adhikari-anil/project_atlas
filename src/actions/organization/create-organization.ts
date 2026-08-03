"use server";

import { createOrganization } from "@/services/organization/create-organization";
import { createOrganizationSchema } from "@/validations/organization-schema";

export async function createOrganizationAction(data: unknown) {
  const validated = createOrganizationSchema.parse(data);

  return createOrganization(validated);
}
