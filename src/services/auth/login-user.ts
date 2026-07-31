import { createSession } from "@/repositories/index";

import { findUserByEmail } from "@/repositories/index";

import { comparePassword } from "@/lib/hash";

import { hashToken } from "@/lib/crypto";

import { LoginInput } from "@/validations/auth-schema";
import { issueTokens } from "./issue-tokens";

export async function loginUser(data: LoginInput) {
  const { email, password } = data;

  /*
   * Find user
   */
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  /*
   * Verify password
   */
  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  /*
   * Create temporary refresh token
   */
  const rawRefreshToken = crypto.randomUUID();

  /*
   * Hash refresh token
   */
  const refreshTokenHash = hashToken(rawRefreshToken);

  /*
   * Create session
   */
  const session = await createSession({
    user: {
      connect: {
        id: user.id,
      },
    },
    refreshTokenHash,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  /*
   * Generate JWTs
   */
  // const accessToken = generateAccessToken({
  //   userId: user.id,
  //   sessionId: session.id,
  // });

  // const refreshToken = generateRefreshToken({
  //   userId: user.id,
  //   sessionId: session.id,
  //   token: rawRefreshToken,
  // });

  await issueTokens({
    userId: user.id,
    sessionId: session.id,
    refreshToken: rawRefreshToken,
  });

  return {
    user,
  };
}
