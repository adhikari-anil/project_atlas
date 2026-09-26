import { readAuthConfig } from "../lib/config.js";

export async function contextCommand() {
  const config = await readAuthConfig();

  if (!config) {
    console.log("You are not logged in.");
    console.log("Run: projecthub auth login");
    return;
  }

  if (!config.currentOrganization) {
    console.log("No organization selected.");
    console.log("Run: projecthub org use <org>");
    return;
  }

  console.log("Current context");
  console.log(`\nOrganization: ${config.currentOrganization.name}`);
  console.log(`Slug: ${config.currentOrganization.slug}`);
}