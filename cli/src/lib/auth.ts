import { ApiError, apiRequest } from "./api.js";
import {
  clearAuthConfig,
  readAuthConfig,
  writeAuthConfig,
  type AuthConfig,
  type StoredUser,
} from "./config.js";

interface AuthResponse {
  user: StoredUser;
  tokens: { accessToken: string; refreshToken: string };
}

export async function login(email: string, password: string) {
  const response = await apiRequest<AuthResponse>("/api/cli/auth/login", {
    method: "POST",
    body: { email, password },
  });

  await writeAuthConfig({
    accessToken: response.tokens.accessToken,
    refreshToken: response.tokens.refreshToken,
    user: response.user,
    currentOrganization: null,
  });

  return response.user;
}

export async function logout() {
  const config = await readAuthConfig();

  if (!config) {
    return false;
  }

  try {
    await apiRequest("/api/cli/auth/logout", {
      method: "POST",
      token: config.refreshToken,
    });
  } finally {
    await clearAuthConfig();
  }

  return true;
}

async function refresh(config: AuthConfig) {
  const response = await apiRequest<{
    tokens: { accessToken: string; refreshToken: string };
  }>("/api/cli/auth/refresh", {
    method: "POST",
    token: config.refreshToken,
  });

  const updated = { ...config, ...response.tokens };
  await writeAuthConfig(updated);
  return updated;
}

export async function currentUser() {
  let config = await readAuthConfig();

  if (!config) {
    return null;
  }

  try {
    const response = await apiRequest<{ user: StoredUser }>(
      "/api/cli/auth/status",
      { token: config.accessToken },
    );
    return response.user;
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }

    try {
      config = await refresh(config);
      const response = await apiRequest<{ user: StoredUser }>(
        "/api/cli/auth/status",
        { token: config.accessToken },
      );
      return response.user;
    } catch (refreshError) {
      if (
        !(refreshError instanceof ApiError) ||
        refreshError.status !== 401
      ) {
        throw refreshError;
      }

      await clearAuthConfig();
      return null;
    }
  }
}