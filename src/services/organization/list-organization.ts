import { getCurrentUser } from "@/services/index";

import { findUserOrganizations } from "@/repositories/index";

export async function listOrganizations() {
  const user = await getCurrentUser();

  return findUserOrganizations(user.id);
}
