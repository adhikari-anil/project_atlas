import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth/getCurrentUser";

function bearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function GET(request: NextRequest) {
  const token = bearerToken(request);

  console.log("Receive token: ", token);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated!" }, { status: 401 });
  }

  try {
    console.log("A: before getCurrentUser");
    const user = await getCurrentUser(token);
    console.log("B: AFTER getCurrentUser");
    console.log("Details of user: ", user);

    console.log("1. getCurrentUser returned");

    console.log("user:", user);

    console.log("2. About to create response");

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
