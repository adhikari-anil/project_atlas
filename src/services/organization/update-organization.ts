import { ActivityType, OrganizationRole } from "../../../generated/prisma/enums";
import { getCurrentUser } from "@/services/index";
import {
  findOrganizationMembership,
  updateOrganization as updateOrganizationRepository,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";
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
  const organization = await updateOrganizationRepository(organizationId, {
    ...data,
    description: data.description ?? null,
    logoUrl: data.logoUrl ?? null,
  });

  await createActivity({
    organizationId,
    userId: user.id,
    type: ActivityType.ORGANIZATION_UPDATED,
    message: `Updated organization "${organization.name}"`,
  });

  return organization;
}
