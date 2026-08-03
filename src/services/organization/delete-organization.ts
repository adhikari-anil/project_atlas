import { OrganizationRole } from "../../../generated/prisma/enums";
import { getCurrentUser } from "@/services/index";
import {
  deleteOrganization as deleteOrganizationRepository,
  findOrganizationMembership,
} from "@/repositories";
export async function deleteOrganization(organizationId: string) {
  const user = await getCurrentUser();
  const membership = await findOrganizationMembership(organizationId, user.id);
  if (!membership) {
    throw new Error("Organization not found.");
  }
  if (membership.role !== OrganizationRole.OWNER) {
    throw new Error("Only the organization owner can delete it.");
  }
  return deleteOrganizationRepository(organizationId);
}
