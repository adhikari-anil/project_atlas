import { cookies } from "next/headers";

import { AUTH } from "@/constants/auth";

import { hashToken } from "@/lib/crypto";
import { verifyRefreshToken } from "@/lib/jwt";

import { findSessionById, updateSession } from "@/repositories";
import { issueTokens } from "./issue-tokens";

export async function refreshSession() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get(AUTH.REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const payload = verifyRefreshToken(refreshToken);

  const session = await findSessionById(payload.sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  if (session.expiresAt < new Date()) {
    throw new Error("Session expired");
  }

  const incomingHash = hashToken(payload.token!);

  if (incomingHash !== session.refreshTokenHash) {
    throw new Error("Invalid refresh token");
  }

  // Rotate refresh token
  const rawRefreshToken = crypto.randomUUID();

  const refreshTokenHash = hashToken(rawRefreshToken);

  await updateSession(session.id, {
    refreshTokenHash,
    expiresAt: new Date(Date.now() + AUTH.REFRESH_COOKIE_MAX_AGE * 1000),
  });

  await issueTokens({
    userId: payload.userId,
    sessionId: session.id,
    refreshToken: rawRefreshToken,
  });

  return {
    success: true,
  };
}
