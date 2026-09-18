"use server";

import { createTeamUpdate } from "@/services";
import {
  createTeamUpdateSchema,
  CreateTeamUpdateInput,
} from "@/validations/team-update-schema";

export async function createTeamUpdateAction(
  organizationId: string,
  data: CreateTeamUpdateInput,
) {
  const validated = createTeamUpdateSchema.parse(data);

  return createTeamUpdate(organizationId, validated);
}
