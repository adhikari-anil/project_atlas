import { OrganizationRole } from "../../../generated/prisma/enums";
import { getCurrentUser } from "@/services/index";
import {
  findOrganizationMembership,
  updateOrganization as updateOrganizationRepository,
} from "@/repositories";
import { UpdateOrganizationInput } from "@/validations/organization-schema";
export async function updateOrganization(
  organizationId: string,
  data: UpdateOrganizationInput,
) {
  const user = await getCurrentUser();
  const membership = await findOrganizationMembership(organizationId, user.id);
  if (!membership) {
    throw new Error("Organization not found.");
  }
  if (
    membership.role !== OrganizationRole.OWNER &&
    membership.role !== OrganizationRole.ADMIN
  ) {
    throw new Error("You are not allowed to update this organization.");
  }
  return updateOrganizationRepository(organizationId, {
    ...data,
    description: data.description ?? null,
    logoUrl: data.logoUrl ?? null,
  });
}
