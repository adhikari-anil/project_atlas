import { currentUser } from "../../lib/auth.js";

export async function statusCommand() {
  const user = await currentUser();

  if (!user) {
    console.log("Not logged in.");
    console.log("Run: projecthub auth login");
    return;
  }

  console.log("Logged in");
  console.log(`\nUser: ${user.email}`);
}