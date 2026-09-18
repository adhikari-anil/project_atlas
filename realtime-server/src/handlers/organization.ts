import type { Socket } from "socket.io";

import { OrganizationMemberStatus } from "../../../generated/prisma/enums";

import { prisma } from "../lib/prisma";

export function registerOrganizationHandlers(socket: Socket) {
  socket.on(
    "organization:join",
    async (
      organizationId: string,
      callback?: (response: { success: boolean; message?: string }) => void,
    ) => {
      try {
        const userId = socket.data.userId;

        if (!userId) {
          callback?.({
            success: false,
            message: "Unauthenticated.",
          });

          return;
        }

        const membership = await prisma.organizationMember.findUnique({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
        });

        if (
          !membership ||
          membership.status !== OrganizationMemberStatus.ACTIVE
        ) {
          callback?.({
            success: false,
            message: "You are not an active member of this organization.",
          });

          return;
        }

        const roomName = `organization:${organizationId}`;

        await socket.join(roomName);

        console.log(`User ${userId} joined ${roomName}`);

        callback?.({
          success: true,
        });
      } catch (error) {
        console.error("Failed to join organization:", error);

        callback?.({
          success: false,
          message: "Failed to join organization.",
        });
      }
    },
  );
}
