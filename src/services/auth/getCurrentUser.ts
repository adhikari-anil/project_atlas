import { cookies } from "next/headers";

import { verifyAccessToken } from "@/lib/jwt";

import { findById } from "@/repositories/user/find-user-by-id";
import { AUTH } from "@/constants/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(AUTH.ACCESS_COOKIE_NAME)?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const payload = verifyAccessToken(accessToken);

  const user = await findById(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
