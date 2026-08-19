"use server";
import { changeMemberRole } from "@/services/index";
import { changeMemberRoleSchema } from "@/validations/change-member-role";
export async function changeMemberRoleAction(
  organizationId: string,
  data: unknown,
) {
  const validated = changeMemberRoleSchema.parse(data);
  return changeMemberRole(organizationId, validated);
}
