import { NextRequest, NextResponse } from "next/server";

import { logoutUser } from "@/services/auth/logout-user";

function bearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function POST(request: NextRequest) {
  console.log("Request hold from POST Method: ", request);
  const token = bearerToken(request);

  if (token) {
    await logoutUser(token);
  }

  return NextResponse.json({ success: true });
}
