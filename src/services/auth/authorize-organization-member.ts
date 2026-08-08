import { OrganizationRole } from "../../../generated/prisma/enums";

import { findOrganizationMember } from "@/repositories";

interface AuthorizeOrganizationMemberParams {
  organizationId: string;
  userId: string;
  allowedRoles: OrganizationRole[];
}

export async function authorizeOrganizationMember({
  organizationId,
  userId,
  allowedRoles,
}: AuthorizeOrganizationMemberParams) {

  //Find membership
  
  const membership = await findOrganizationMember(organizationId, userId);

  if (!membership) {
    throw new Error("You are not a member of this organization.");
  }

  // Check role
  
  if (!allowedRoles.includes(membership.role)) {
    throw new Error("You do not have permission to perform this action.");
  }

  return membership;
}
