import { cookies } from "next/headers";

import { CURRENT_ORGANIZATION_COOKIE } from "@/constants/auth";

import { getCurrentUser } from "@/services";

import { findOrganizationMember, findOrganizationById } from "@/repositories";

export async function getCurrentOrganization() {
  const cookieStore = await cookies();

  const organizationId = cookieStore.get(CURRENT_ORGANIZATION_COOKIE)?.value;

  if (!organizationId) {
    return null;
  }

  const user = await getCurrentUser();

  const membership = await findOrganizationMember(organizationId, user.id);

  if (!membership || membership.status !== "ACTIVE") {
    return null;
  }

  const organization = await findOrganizationById(organizationId);

  return organization;
}
