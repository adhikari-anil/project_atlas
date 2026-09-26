import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth/getCurrentUser";

function bearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function GET(request: NextRequest) {
  const token = bearerToken(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated!" }, { status: 401 });
  }

  try {
    const user = await getCurrentUser(token);
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
}
