import { cookies } from "next/headers";

import { CURRENT_ORGANIZATION_COOKIE } from "@/constants/auth";
import { getCurrentUser } from "../auth/getCurrentUser";
import { findOrganizationMember } from "@/repositories";

export async function setCurrentOrganization(organizationId: string) {
  const user = await getCurrentUser();
  const membership = await findOrganizationMember(organizationId, user.id);
  if (!membership) {
    throw new Error("You are not a member of this organization.");
  }

  const cookieStore = await cookies();

  cookieStore.set(CURRENT_ORGANIZATION_COOKIE, organizationId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
