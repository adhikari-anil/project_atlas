import { cookies } from "next/headers";

import { verifyRefreshToken } from "@/lib/jwt";
import { clearAuthCookies } from "@/lib/cookies";

import { deleteSession } from "@/repositories";
import { AUTH } from "@/constants/auth";

export async function logoutUser(refreshTokenOverride?: string) {
  const refreshToken =
    refreshTokenOverride ??
    (await cookies()).get(AUTH.REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    if (!refreshTokenOverride) {
      await clearAuthCookies();
    }
    return;
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    await deleteSession(payload.sessionId);
  } catch {
    // Ignore invalid token
  }

  if (!refreshTokenOverride) {
    await clearAuthCookies();
  }

  return {
    success: true,
  };
}
