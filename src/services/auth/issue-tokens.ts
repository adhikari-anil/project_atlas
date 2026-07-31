import { setAuthCookies } from "@/lib/cookies";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

interface IssueTokensParams {
  userId: string;
  sessionId: string;
  refreshToken: string;
}

export async function issueTokens({
  userId,
  sessionId,
  refreshToken,
}: IssueTokensParams) {
  const accessToken = generateAccessToken({
    userId,
    sessionId,
  });

  const newRefreshToken = generateRefreshToken({
    userId,
    sessionId,
    token: refreshToken,
  });

  await setAuthCookies(accessToken, newRefreshToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}
