import { getCurrentUser } from "@/services/index";

import { findUserOrganizationsByUserId } from "@/repositories/index";

export async function listOrganizations() {
  const user = await getCurrentUser();

  return findUserOrganizationsByUserId(user.id);
}
