"use server";

import { refreshSession } from "@/services";

export async function refreshSessionAction() {
  await refreshSession();
}
