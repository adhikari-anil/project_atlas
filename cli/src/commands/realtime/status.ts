import {
  isProcessRunning,
  readRealtimeWatchState,
} from "../../lib/realtime-state.js";

export async function statusCommand() {
  const state = await readRealtimeWatchState();
  const running = isProcessRunning(state.pid);
  const connection = running ? state.connection : "stopped";

  console.log(
    `Watch process: ${running ? `running (PID ${state.pid})` : "not running"}`,
  );
  console.log(`Connection: ${connection}`);
  console.log(`Last update: ${state.lastUpdateAt ?? "none received"}`);
}
