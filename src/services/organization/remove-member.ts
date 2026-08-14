import {
  findOrganizationMember,
  removeOrganizationMember,
} from "@/repositories";

import {
  authorizeOrganizationMember,
  getCurrentOrganization,
  getCurrentUser,
} from "@/services";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function removeMember(userId: string) {
  const currentUser = await getCurrentUser();

  const organizationId = await getCurrentOrganization();

  // 1. Check current user's permission
  await authorizeOrganizationMember({
    organizationId,
    userId: currentUser.id,
    allowedRoles: [OrganizationRole.OWNER, OrganizationRole.ADMIN],
  });

  // 2. Find the member being removed
  const member = await findOrganizationMember(organizationId, userId);

  if (!member) {
    throw new Error("Organization member not found.");
  }

  if (member.status !== "ACTIVE") {
    throw new Error("This user is not an active member.");
  }

  // 3. Prevent self-removal
  if (currentUser.id === userId) {
    throw new Error("Use leave organization to leave the organization.");
  }

  // 4. Owner cannot be removed
  if (member.role === OrganizationRole.OWNER) {
    throw new Error("The organization owner cannot be removed.");
  }

  // 5. Admin cannot remove another admin
  if (member.role === OrganizationRole.ADMIN) {
    throw new Error("Admins cannot remove another admin.");
  }

  // 6. Remove the member
  return removeOrganizationMember(organizationId, userId);
}
