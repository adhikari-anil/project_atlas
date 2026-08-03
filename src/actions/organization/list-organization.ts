"use server";

import { listOrganizations } from "@/services/index";

export async function listOrganizationsAction() {
  return listOrganizations();
}
