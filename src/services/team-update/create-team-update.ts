import {
  createTeamUpdate as createTeamUpdateRepo,
  findOrganizationMember,
} from "@/repositories";
import { createActivity } from "@/services/activities/create-activity";
import { getCurrentUser } from "@/services/auth/getCurrentUser";
import { ActivityType, TeamUpdateType } from "../../../generated/prisma/enums";
import { CreateTeamUpdateInput } from "@/validations/team-update-schema";

export async function createTeamUpdate(
  organizationId: string,
  data: CreateTeamUpdateInput,
) {
  const currentUser = await getCurrentUser();

  const membership = await findOrganizationMember(
    organizationId,
    currentUser.id,
  );

  if (!membership || membership.status !== "ACTIVE") {
    throw new Error("You are not an active member of this organization.");
  }

  const teamUpdate = await createTeamUpdateRepo({
    organizationId,
    userId: currentUser.id,
    message: data.message,
    type: data.type as TeamUpdateType,
    taskId: data.taskId || undefined,
  });

  // Automatically record activity and broadcast
  await createActivity({
    organizationId,
    projectId: undefined,
    taskId: data.taskId || undefined,
    userId: currentUser.id,
    type: ActivityType.TEAM_UPDATE,
    message: data.message,
  });

  return teamUpdate;
}
