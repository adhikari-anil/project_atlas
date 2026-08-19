import { OrganizationRole } from "../../../generated/prisma/enums";
import { getCurrentUser } from "@/services/index";
import {
  findOrganizationMembership,
  updateOrganizationMemberRole,
} from "@/repositories";
import { ChangeMemberRoleSchemaInput } from "@/validations/change-member-role";
export async function changeMemberRole(
  organizationId: string,
  data: ChangeMemberRoleSchemaInput,
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
    throw new Error("You are not allowed to update this role.");
  }

  // Prevent changing your own role
  if (user.id === data.userId) {
    throw new Error("You cannot change your own role.");
  }

  // Target member
  const targetMembership = await findOrganizationMembership(
    organizationId,
    data.userId,
  );

  if (!targetMembership) {
    throw new Error("Member not found.");
  }

  // Owner cannot be modified
  if (targetMembership.role === OrganizationRole.OWNER) {
    throw new Error("The organization owner role cannot be changed.");
  }

  // Admin can only modify MEMBERs
  if (
    membership.role === OrganizationRole.ADMIN &&
    targetMembership.role !== OrganizationRole.MEMBER
  ) {
    throw new Error("Admins can only change the role of members.");
  }

  return updateOrganizationMemberRole(organizationId, data.userId, data.role);
}
