import { NextRequest, NextResponse } from "next/server";

import { createProject, listProjects } from "@/services";
import { createProjectSchema } from "@/validations/project-schema";
import {
  handleProjectApiError,
  projectResponse,
  requireProjectContext,
} from "./_lib";

export async function GET(request: NextRequest) {
  try {
    const context = await requireProjectContext(request);
    const projects = await listProjects(context.organizationId);
    return NextResponse.json({ projects: projects.map(projectResponse) });
  } catch (error) {
    return handleProjectApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const context = await requireProjectContext(request);
    const body: unknown = await request.json();
    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid project data." },
        { status: 400 },
      );
    }

    const project = await createProject(parsed.data, context);
    return NextResponse.json({ project: projectResponse(project) }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "A project with this name already exists."
    ) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return handleProjectApiError(error);
  }
}