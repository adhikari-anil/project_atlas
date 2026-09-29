import { NextRequest } from "next/server";

import { getCurrentUser } from "@/services/auth/getCurrentUser";
import { authorizeOrganizationMember } from "@/services/auth/authorize-organization-member";
import { OrganizationRole } from "../../../../../generated/prisma/enums";

export class ProjectApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function requireProjectContext(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;
  const organizationId = request.headers.get("x-organization-id");

  if (!token) {
    throw new ProjectApiError("Not authenticated.", 401);
  }

  if (!organizationId) {
    throw new ProjectApiError("Select an organization first.", 400);
  }

  let user;
  try {
    user = await getCurrentUser(token);
  } catch {
    throw new ProjectApiError("Not authenticated.", 401);
  }

  try {
    await authorizeOrganizationMember({
      organizationId,
      userId: user.id,
      allowedRoles: [
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
        OrganizationRole.MEMBER,
      ],
    });
  } catch {
    throw new ProjectApiError("You do not have access to this organization.", 403);
  }

  return { userId: user.id, organizationId };
}

export function handleProjectApiError(error: unknown) {
  if (error instanceof ProjectApiError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  return Response.json({ error: "Unable to complete the project request." }, {
    status: 500,
  });
}

export function projectResponse(project: {
  id: string;
  organizationId: string;
  createdById: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: project.id,
    organizationId: project.organizationId,
    createdById: project.createdById,
    name: project.name,
    slug: project.slug,
    description: project.description,
    status: project.status,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}