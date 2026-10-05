import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

export type RealtimeWatchState = {
  pid: number | null;
  connection: "connecting" | "connected" | "reconnecting" | "stopped";
  lastUpdateAt: string | null;
};

const directory = join(homedir(), ".product");
const stateFile = join(directory, "realtime.json");

export async function readRealtimeWatchState(): Promise<RealtimeWatchState> {
  try {
    const state = JSON.parse(
      await readFile(stateFile, "utf8"),
    ) as RealtimeWatchState;
    return {
      pid: typeof state.pid === "number" ? state.pid : null,
      connection: state.connection ?? "stopped",
      lastUpdateAt: state.lastUpdateAt ?? null,
    };
  } catch {
    return { pid: null, connection: "stopped", lastUpdateAt: null };
  }
}

export async function writeRealtimeWatchState(state: RealtimeWatchState) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await chmod(directory, 0o700);
  await writeFile(stateFile, `${JSON.stringify(state, null, 2)}\n`, {
    mode: 0o600,
  });
  await chmod(stateFile, 0o600);
}

export function isProcessRunning(pid: number | null) {
  if (!pid) return false;

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
