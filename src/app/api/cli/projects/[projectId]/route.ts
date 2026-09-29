import { NextRequest, NextResponse } from "next/server";

import { deleteProject, getProject, updateProject } from "@/services";
import {
  projectIdSchema,
  updateProjectSchema,
} from "@/validations/project-schema";
import {
  handleProjectApiError,
  projectResponse,
  requireProjectContext,
  ProjectApiError,
} from "../_lib";

type RouteContext = { params: Promise<{ projectId: string }> };

async function validatedProjectId(routeContext: RouteContext) {
  const { projectId } = await routeContext.params;
  const parsed = projectIdSchema.safeParse({ projectId });

  if (!parsed.success) {
    throw new ProjectApiError("Invalid project ID.", 400);
  }

  return parsed.data.projectId;
}

async function projectInContext(projectId: string, organizationId: string) {
  const project = await getProject(projectId);

  if (project.organizationId !== organizationId) {
    throw new ProjectApiError("Project not found.", 404);
  }

  return project;
}

export async function GET(request: NextRequest, routeContext: RouteContext) {
  try {
    const context = await requireProjectContext(request);
    const projectId = await validatedProjectId(routeContext);
    const project = await projectInContext(projectId, context.organizationId);
    return NextResponse.json({ project: projectResponse(project) });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found.") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    return handleProjectApiError(error);
  }
}

export async function PATCH(request: NextRequest, routeContext: RouteContext) {
  try {
    const context = await requireProjectContext(request);
    const projectId = await validatedProjectId(routeContext);
    await projectInContext(projectId, context.organizationId);

    const body: unknown = await request.json();
    const parsed = updateProjectSchema.safeParse(body);

    if (!parsed.success || Object.keys(parsed.data ?? {}).length === 0) {
      return NextResponse.json(
        { error: parsed.success ? "Provide at least one field to update." : parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const project = await updateProject(projectId, parsed.data, context.userId);
    return NextResponse.json({ project: projectResponse(project) });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found.") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    if (error instanceof Error && error.message.includes("permission")) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return handleProjectApiError(error);
  }
}

export async function DELETE(request: NextRequest, routeContext: RouteContext) {
  try {
    const context = await requireProjectContext(request);
    const projectId = await validatedProjectId(routeContext);
    await projectInContext(projectId, context.organizationId);
    const project = await deleteProject(projectId, context.userId);
    return NextResponse.json({ project: projectResponse(project) });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found.") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    if (error instanceof Error && error.message.includes("permission")) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return handleProjectApiError(error);
  }
}