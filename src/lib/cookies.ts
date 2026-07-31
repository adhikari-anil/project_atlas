import { cookies } from "next/headers";
import { AUTH } from "@/constants/auth";

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH.ACCESS_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH.ACCESS_COOKIE_MAX_AGE,
  });

  cookieStore.set(AUTH.REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH.REFRESH_COOKIE_MAX_AGE,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH.ACCESS_COOKIE_NAME);
  cookieStore.delete(AUTH.REFRESH_COOKIE_NAME);
}
