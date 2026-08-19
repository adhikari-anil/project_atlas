import Image from "next/image";
import { RemoveMemberButton } from "./remove-member-button";
import { OrganizationRole } from "../../../../generated/prisma/enums";

interface OrganizationMember {
  organizationId: string;
  userId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  status: "ACTIVE" | "LEFT";
  joinedAt: Date;
  user: {
    id: string;
    email: string;
    username: string | null;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

interface OrganizationMemberListProps {
  members: OrganizationMember[];
  role: OrganizationRole | undefined;
}

export function OrganizationMemberList({
  members,
  role,
}: OrganizationMemberListProps) {
  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold">Members</h2>

        <p className="mt-1 text-sm text-gray-500">
          People who belong to this organization.
        </p>
      </div>

      <div className="divide-y">
        {members.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No members found.</div>
        ) : (
          members.map((member) => {
            const canRemoveMember =
              (role === "OWNER" && member.role !== "OWNER") ||
              (role === "ADMIN" && member.role === "MEMBER");
            return (
              <div
                key={member.userId}
                className="flex items-center justify-between p-6"
              >
                <div className="flex items-center gap-3">
                  {member.user.avatarUrl ? (
                    <Image
                      src={member.user.avatarUrl}
                      alt={`${member.user.firstName} ${member.user.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium">
                      {member.user.firstName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="font-medium">
                      {member.user.firstName} {member.user.lastName}
                    </p>

                    <p className="text-sm text-gray-500">{member.user.email}</p>
                  </div>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                  {member.role}
                </span>
                {canRemoveMember && (
                  <RemoveMemberButton userId={member.userId} />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
