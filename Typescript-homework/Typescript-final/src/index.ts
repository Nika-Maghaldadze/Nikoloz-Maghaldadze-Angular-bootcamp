import { loadState, saveState } from "./storage/filestorage";
import { runMainMenu } from "./menu/mainMenu";
import { closeInput } from "./utils/input";
import type { AppState } from "./models/type";

async function main(): Promise<void> {
  let state: AppState;

  try {
    state = await loadState();
  } catch (err: unknown) {
    console.error("Failed to load state. Starting with empty state.", err);
    state = { boards: [] };
  }

  try {
    await runMainMenu(state);
    await saveState(state);
  } catch (err: unknown) {
    console.error("Unexpected error:", err);
  } finally {
    closeInput();
    console.log("Goodbye!");
  }
}

void main();
