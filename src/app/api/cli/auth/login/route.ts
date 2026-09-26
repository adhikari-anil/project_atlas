import { NextRequest, NextResponse } from "next/server";

import { loginUser } from "@/services/auth/login-user";
import { loginSchema } from "@/validations/auth-schema";

function publicUser(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string | null;
  avatarUrl: string | null;
}) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    avatarUrl: user.avatarUrl,
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  try {
    const { user, tokens } = await loginUser(parsed.data, { setCookies: false });

    return NextResponse.json({
      user: publicUser(user),
      tokens,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }
}