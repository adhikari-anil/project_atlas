"use client";

import { logoutUserAction } from "@/actions/auth/logout-user";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await logoutUserAction();
      }}
    >
      Logout
    </button>
  );
}
