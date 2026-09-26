import { apiRequest } from "./api.js";
import {
  readAuthConfig,
  writeAuthConfig,
  type StoredOrganization,
} from "./config.js";

export async function listOrganizations() {
  const config = await readAuthConfig();

  if (!config) {
    return null;
  }

  const response = await apiRequest<{ organizations: StoredOrganization[] }>(
    "/api/cli/organizations",
    { token: config.accessToken },
  );

  return response.organizations;
}

export async function selectOrganization(identifier: string) {
  const config = await readAuthConfig();

  if (!config) {
    return null;
  }

  const response = await apiRequest<{ organization: StoredOrganization }>(
    "/api/cli/organizations/current",
    {
      method: "POST",
      token: config.accessToken,
      body: { organization: identifier },
    },
  );

  await writeAuthConfig({
    ...config,
    currentOrganization: response.organization,
  });

  return response.organization;
}