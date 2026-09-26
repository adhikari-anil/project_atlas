import { setAuthCookies } from "@/lib/cookies";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

interface IssueTokensParams {
  userId: string;
  sessionId: string;
  refreshToken: string;
  setCookies?: boolean;
}

export async function issueTokens({
  userId,
  sessionId,
  refreshToken,
  setCookies = true,
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

  if (setCookies) {
    await setAuthCookies(accessToken, newRefreshToken);
  }

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}
