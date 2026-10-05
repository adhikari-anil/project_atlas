import { NextRequest, NextResponse } from "next/server";

import { listActivities } from "@/repositories";
import {
  handleProjectApiError,
  requireProjectContext,
} from "../../projects/_lib";

export async function GET(request: NextRequest) {
  try {
    const context = await requireProjectContext(request);
    const countParam = request.nextUrl.searchParams.get("count");
    const count = countParam === null ? 5 : Number(countParam);

    if (!Number.isInteger(count) || count < 1 || count > 50) {
      return NextResponse.json(
        { error: "count must be an integer between 1 and 50." },
        { status: 400 },
      );
    }

    const activities = await listActivities({
      organizationId: context.organizationId,
      take: count,
    });

    return NextResponse.json({ activities });
  } catch (error) {
    return handleProjectApiError(error);
  }
}
