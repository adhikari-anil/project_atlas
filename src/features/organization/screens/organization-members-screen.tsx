import { listMembers } from "@/services/organization/list-member";

import { InviteMemberForm } from "../components/invite-member-form";
import { OrganizationMemberList } from "../components/organization-member-list";

export async function OrganizationMembersScreen() {
  const members = await listMembers();

  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Organization Members</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage people who belong to your organization.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <InviteMemberForm />

        <OrganizationMemberList members={members} />
      </div>
    </main>
  );
}
