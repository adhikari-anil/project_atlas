import { NextRequest, NextResponse } from "next/server";

import { refreshSession } from "@/services/auth/refresh-session";

function bearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function POST(request: NextRequest) {
  const token = bearerToken(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const result = await refreshSession(token, { setCookies: false });
    return NextResponse.json({ tokens: result.tokens });
  } catch {
    return NextResponse.json({ error: "Session expired." }, { status: 401 });
  }
}