import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth/getCurrentUser";
import { findUserOrganizationsByUserId } from "@/repositories/organization/find-user-organizations";

function bearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function POST(request: NextRequest) {
  const token = bearerToken(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Organization is required." }, { status: 400 });
  }

  const organization =
    typeof body === "object" && body !== null && "organization" in body
      ? body.organization
      : undefined;

  if (typeof organization !== "string" || !organization.trim()) {
    return NextResponse.json({ error: "Organization is required." }, { status: 400 });
  }

  try {
    const user = await getCurrentUser(token);
    const memberships = await findUserOrganizationsByUserId(user.id);
    const membership = memberships.find(
      (item) =>
        item.organization.id === organization.trim() ||
        item.organization.slug === organization.trim(),
    );

    if (!membership) {
      return NextResponse.json(
        { error: "You do not have access to this organization." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      organization: {
        ...membership.organization,
        createdAt: membership.organization.createdAt.toISOString(),
        role: membership.role,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
}