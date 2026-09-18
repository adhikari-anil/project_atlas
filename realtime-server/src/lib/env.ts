import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const realtimeServerDirectory = resolve(currentDirectory, "../..");
const projectDirectory = resolve(realtimeServerDirectory, "..");

// The web app owns the shared local configuration. A service-specific .env is
// optional and intentionally takes precedence for deployments.
dotenv.config({ path: resolve(projectDirectory, ".env") });
dotenv.config({
  path: resolve(realtimeServerDirectory, ".env"),
  override: true,
});

export function assertRealtimeEnvironment() {
  const required = [
    "DATABASE_URL",
    "ACCESS_TOKEN_SECRET",
    "REALTIME_INTERNAL_SECRET",
  ];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(
      `Realtime server is missing required environment variables: ${missing.join(", ")}`,
    );
  }
}
