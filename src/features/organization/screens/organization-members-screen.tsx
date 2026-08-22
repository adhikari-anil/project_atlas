import { listMembers } from "@/services/organization/list-member";

import { InviteMemberForm } from "../components/invite-member-form";
import { OrganizationMemberList } from "../components/organization-member-list";
import { LeaveOrganizationButton } from "../components/leave-organization-button";
import { getCurrentUser } from "@/services";
import { OrganizationRole } from "../../../../generated/prisma/enums";

export async function OrganizationMembersScreen() {
  const members = await listMembers();
  const currentUser = await getCurrentUser();

  const currentMember = members.find((item) => item.userId === currentUser.id);

  const role = currentMember?.role as OrganizationRole;

  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Organization Members</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage people who belong to your organization.
        </p>
      </div>
      {role !== "ADMIN" && role !== "OWNER" && <LeaveOrganizationButton />}
      <div
        className={`grid gap-8 ${role !== "MEMBER" ? "lg:grid-cols-[1fr_2fr]" : ""}`}
      >
        {role !== "MEMBER" && <InviteMemberForm />}
        <OrganizationMemberList
          members={members}
          role={role}
          currentUser={currentUser}
        />
      </div>
    </main>
  );
}
