import { listOrganizationMembers as listOrganizationMembersRepository } from "@/repositories";

import { authorizeOrganizationMember, getCurrentUser } from "@/services";

import { OrganizationRole } from "../../../generated/prisma/enums";

export async function listOrganizationMembers(organizationId: string) {
  const currentUser = await getCurrentUser();

  await authorizeOrganizationMember({
    organizationId,
    userId: currentUser.id,

    allowedRoles: [
      OrganizationRole.OWNER,
      OrganizationRole.ADMIN,
      OrganizationRole.MEMBER,
    ],
  });

  return listOrganizationMembersRepository(organizationId);
}
