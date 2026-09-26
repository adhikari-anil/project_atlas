import { logout } from "../../lib/auth.js";

export async function logoutCommand() {
  const wasLoggedIn = await logout();

  if (!wasLoggedIn) {
    console.log("You are not logged in.");
    return;
  }

  console.log("✓ Logged out successfully.");
}