export const AUTH = {
  ACCESS_COOKIE_NAME: "access_token",
  REFRESH_COOKIE_NAME: "refresh_token",

  ACCESS_TOKEN_EXPIRES_IN: "15m",
  REFRESH_TOKEN_EXPIRES_IN: "30d",

  ACCESS_COOKIE_MAX_AGE: 60 * 15, // 15 minutes
  REFRESH_COOKIE_MAX_AGE: 60 * 60 * 24 * 30, // 30 days
} as const;

export const CURRENT_ORGANIZATION_COOKIE = "current_organization";
