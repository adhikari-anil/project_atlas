import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth/getCurrentUser";
import { findUserOrganizationsByUserId } from "@/repositories/organization/find-user-organizations";

function bearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

function publicOrganization(membership: {
  role: string;
  organization: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    type: string;
    createdAt: Date;
  };
}) {
  return {
    ...membership.organization,
    createdAt: membership.organization.createdAt.toISOString(),
    role: membership.role,
  };
}

export async function GET(request: NextRequest) {
  const token = bearerToken(request);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const user = await getCurrentUser(token);
    const memberships = await findUserOrganizationsByUserId(user.id);

    return NextResponse.json({
      organizations: memberships.map(publicOrganization),
    });
  } catch {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
}