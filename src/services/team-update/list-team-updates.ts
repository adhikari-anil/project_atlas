import {
  listTeamUpdates as listTeamUpdatesRepo,
  findOrganizationMember,
} from "@/repositories";
import { getCurrentUser } from "@/services/auth/getCurrentUser";

export async function listTeamUpdates(organizationId: string, take: number = 50) {
  const currentUser = await getCurrentUser();

  const membership = await findOrganizationMember(
    organizationId,
    currentUser.id,
  );

  if (!membership || membership.status !== "ACTIVE") {
    throw new Error("You are not an active member of this organization.");
  }

  return listTeamUpdatesRepo(organizationId, take);
}
