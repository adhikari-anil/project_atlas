import { cookies } from "next/headers";

import { verifyAccessToken } from "@/lib/jwt";

import { findById } from "@/repositories/user/find-user-by-id";
import { AUTH } from "@/constants/auth";

export async function getCurrentUser(accessTokenOverride?: string) {
  console.log("🔥🔥🔥 ENTERED getCurrentUser", {
    hasOverride: !!accessTokenOverride,
  });
  const accessToken =
    accessTokenOverride ??
    (await cookies()).get(AUTH.ACCESS_COOKIE_NAME)?.value;

  console.log("AccessToken is: ", accessToken);

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  // const payload = verifyAccessToken(accessToken);
  // console.log("payload: ", payload);

  // const user = await findById(payload.userId);
  // console.log("valid User details: ", user);

  // if (!user) {
  //   throw new Error("User not found");
  // }

  // console.log("8. ABOUT TO RETURN USER");

  let payload;

  try {
    payload = verifyAccessToken(accessToken);

    console.log("🔥 AFTER verifyAccessToken");
    console.log("payload:", payload);
  } catch (error) {
    console.error("🔥🔥 verifyAccessToken THREW:");
    console.error(error);
    console.error(error instanceof Error ? error.stack : String(error));

    throw error;
  }

  console.log("🔥 BEFORE findById");

  const user = await findById(payload.userId);

  console.log("🔥 AFTER findById:", user);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
