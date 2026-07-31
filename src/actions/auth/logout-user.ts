"use server";

import { logoutUser } from "@/services/auth/logout-user";

export async function logoutUserAction() {
  await logoutUser();
}
