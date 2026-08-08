import { cookies } from "next/headers";

import { CURRENT_ORGANIZATION_COOKIE } from "@/constants/auth";

export async function getCurrentOrganization() {
  const cookieStore = await cookies();

  const organizationId = cookieStore.get(CURRENT_ORGANIZATION_COOKIE)?.value;

  if (!organizationId) {
    throw new Error("No organization selected.");
  }

  return organizationId;
}
