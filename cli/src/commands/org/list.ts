import { ApiError } from "../../lib/api.js";
import { listOrganizations } from "../../lib/organizations.js";

export async function listCommand() {
  try {
    const organizations = await listOrganizations();

    if (!organizations) {
      console.log("You are not logged in.");
      console.log("Run: projecthub auth login");
      return;
    }

    if (organizations.length === 0) {
      console.log("No organizations found.");
      return;
    }

    for (const organization of organizations) {
      console.log(
        `${organization.slug}  ${organization.name}  (${organization.role.toLowerCase()})`,
      );
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new Error("You are not logged in.\nRun: projecthub auth login");
    }
    throw error;
  }
}