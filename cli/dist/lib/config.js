import { chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
const productDirectory = join(homedir(), ".product");
const authFile = join(productDirectory, "auth.json");
export function getApiBaseUrl() {
    return (process.env.PRODUCT_API_URL || "http://localhost:3000").replace(/\/$/, "");
}
async function ensureDirectory() {
    await mkdir(productDirectory, { recursive: true, mode: 0o700 });
    await chmod(productDirectory, 0o700);
}
export async function readAuthConfig() {
    try {
        const contents = await readFile(authFile, "utf8");
        return JSON.parse(contents);
    }
    catch {
        return null;
    }
}
export async function writeAuthConfig(config) {
    await ensureDirectory();
    await writeFile(authFile, `${JSON.stringify(config, null, 2)}\n`, {
        mode: 0o600,
    });
    await chmod(authFile, 0o600);
}
export async function clearAuthConfig() {
    await rm(authFile, { force: true });
}
export function getAuthFilePath() {
    return authFile;
}
