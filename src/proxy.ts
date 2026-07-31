import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken } from "@/lib/jwt";
import { AUTH } from "./constants/auth";

const PUBLIC_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH.ACCESS_COOKIE_NAME)?.value;

  const { pathname } = request.nextUrl;

  // Public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    if (token) {
      try {
        verifyAccessToken(token);

        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch {
        // Invalid token - continue
      }
    }

    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      verifyAccessToken(token);

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
