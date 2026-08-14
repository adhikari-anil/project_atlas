import { randomUUID } from "crypto";

import {
  createOrganizationInvitation,
  findOrganizationInvitationByEmail,
} from "@/repositories";

import {
  authorizeOrganizationMember,
  getCurrentUser,
  getCurrentOrganization,
} from "@/services";

import { InviteMemberInput } from "@/validations/organization-membership-schema";

import { OrganizationRole } from "../../../generated/prisma/enums";
import { findOrganizationMemberByEmail } from "@/repositories/organization/member";

export async function inviteMember(data: InviteMemberInput) {
  const currentUser = await getCurrentUser();

  const organizationId = await getCurrentOrganization();

  await authorizeOrganizationMember({
    organizationId,
    userId: currentUser.id,
    allowedRoles: [OrganizationRole.OWNER, OrganizationRole.ADMIN],
  });

  const email = data.email.trim().toLowerCase();

  const existingMember = await findOrganizationMemberByEmail(
    organizationId,
    email,
  );

  if (existingMember) {
    throw new Error("This user is already a member of the organization.");
  }

  const existingInvitation = await findOrganizationInvitationByEmail(
    organizationId,
    email,
  );

  if (existingInvitation) {
    throw new Error("An invitation has already been sent to this email.");
  }

  const token = randomUUID();

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 7);

  return createOrganizationInvitation({
    organizationId,
    invitedById: currentUser.id,
    email,
    role: data.role,
    token,
    expiresAt,
  });
}
