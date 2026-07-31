import { cookies } from "next/headers";

import { verifyRefreshToken } from "@/lib/jwt";
import { clearAuthCookies } from "@/lib/cookies";

import { deleteSession } from "@/repositories";
import { AUTH } from "@/constants/auth";

export async function logoutUser() {
  const cookieStore = await cookies();
  
  const refreshToken = cookieStore.get(AUTH.REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    await clearAuthCookies();
    return;
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    await deleteSession(payload.sessionId);
  } catch {
    // Ignore invalid token
  }

  await clearAuthCookies();

  return {
    success: true,
  };
}
