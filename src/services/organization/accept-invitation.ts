// Without Transactions....

// import {
//   acceptOrganizationInvitation,
//   createOrganizationMember,
//   findOrganizationInvitationByToken,
//   findOrganizationMember,
// } from "@/repositories";

// import { getCurrentUser } from "@/services";

// export async function acceptInvitation(token: string) {
//   const currentUser = await getCurrentUser();

//   const invitation = await findOrganizationInvitationByToken(token);

//   if (!invitation) {
//     throw new Error("Invitation not found.");
//   }

//   if (invitation.acceptedAt) {
//     throw new Error("This invitation has already been accepted.");
//   }

//   if (invitation.expiresAt < new Date()) {
//     throw new Error("This invitation has expired.");
//   }

//   if (currentUser.email.toLowerCase() !== invitation.email.toLowerCase()) {
//     throw new Error("This invitation was sent to a different email address.");
//   }

//   const existingMember = await findOrganizationMember(
//     invitation.organizationId,
//     currentUser.id,
//   );

//   if (existingMember) {
//     throw new Error("You are already a member of this organization.");
//   }

//   const member = await createOrganizationMember({
//     organizationId: invitation.organizationId,

//     userId: currentUser.id,

//     role: invitation.role as "ADMIN" | "MEMBER",
//   });

//   await acceptOrganizationInvitation(invitation.id);

//   return member;
// }

import {
  acceptInvitationTransaction,
  findOrganizationInvitationByToken,
  findOrganizationMember,
  rejoinOrganization,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";

import { getCurrentUser } from "@/services";
import { ActivityType } from "../../../generated/prisma/enums";

export async function acceptInvitation(token: string) {
  const currentUser = await getCurrentUser();

  const invitation = await findOrganizationInvitationByToken(token);

  if (!invitation) {
    throw new Error("Invitation not found.");
  }

  if (invitation.acceptedAt) {
    throw new Error("This invitation has already been accepted.");
  }

  if (invitation.expiresAt < new Date()) {
    throw new Error("This invitation has expired.");
  }

  if (currentUser.email.toLowerCase() !== invitation.email.toLowerCase()) {
    throw new Error("This invitation was sent to a different email address.");
  }

  const existingMember = await findOrganizationMember(
    invitation.organizationId,
    currentUser.id,
  );

  let result;
  if (existingMember?.status === "LEFT") {
    result = await rejoinOrganization(
      invitation.id,
      invitation.organizationId,
      currentUser.id,
      invitation.role as "ADMIN" | "MEMBER",
    );
  } else if (existingMember?.status === "ACTIVE") {
    throw new Error("You are already a member of this organization.");
  } else {
    result = await acceptInvitationTransaction(
      invitation.id,
      invitation.organizationId,
      currentUser.id,
      invitation.role as "ADMIN" | "MEMBER",
    );
  }

  await createActivity({
    organizationId: invitation.organizationId,
    userId: currentUser.id,
    type: ActivityType.MEMBER_JOINED,
    message: `${currentUser.firstName} ${currentUser.lastName} joined the organization`,
  });

  return result;
}
