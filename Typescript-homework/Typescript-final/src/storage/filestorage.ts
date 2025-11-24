import { promises as fs } from "fs";
import * as path from "path";
import type { AppState } from "../models/type";

const DATA_DIR = path.join(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "appState.json");

export async function loadState(): Promise<AppState> {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
        const content = await fs.readFile(STATE_FILE, "utf-8");
        const parsed = JSON.parse(content);
        if (
            !parsed ||
            typeof parsed !== "object" ||
            !Array.isArray(parsed.boards)
        ) {
            return { boards: [] };
        }
        return parsed as AppState;
    } catch (err: any) {
        if (err && err.code === "ENOENT") {
            const empty: AppState = { boards: [] };
            await saveState(empty);
            return empty;
        }
        console.error("Error reading state file, using empty state.", err);
        return { boards: [] };
    }
}

export async function saveState(state: AppState): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const json = JSON.stringify(state, null, 2);
    await fs.writeFile(STATE_FILE, json, "utf-8");
}
