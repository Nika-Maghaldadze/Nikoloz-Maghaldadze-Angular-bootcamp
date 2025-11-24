import type { AppState, Board } from "../models/type";
import { createBoard, deleteBoard } from "../services/boardService";
import { saveState } from "../storage/filestorage";
import {
    question,
    askNonEmpty,
    chooseFromList,
    pause,
    confirm,
} from "../utils/input";
import { runBoardMenu } from "./boardMenu";

export async function runMainMenu(state: AppState): Promise<void> {
    console.log("=== MINI TRELLO CLI ===");

    let running = true;

    while (running) {
        console.log("\nMAIN MENU");
        console.log("1) Select Board");
        console.log("2) Create Board");
        console.log("3) Delete Board");
        console.log("4) Exit");

        const choice = await question("Choose an option: ");

        switch (choice) {
            case "1":
                await handleSelectBoard(state);
                break;
            case "2":
                await handleCreateBoard(state);
                break;
            case "3":
                await handleDeleteBoard(state);
                break;
            case "4":
                running = false;
                break;
            default:
                console.log("Invalid option. Please choose 1-4.");
        }
    }
}

async function handleCreateBoard(state: AppState): Promise<void> {
    const name = await askNonEmpty("Enter board name: ");
    const board = createBoard(state, name);
    await saveState(state);
    console.log(`Board created with id: ${board.id}`);
}

async function handleSelectBoard(state: AppState): Promise<void> {
    if (state.boards.length === 0) {
        console.log("No boards available. Create a board first.");
        await pause();
        return;
    }

    const board = await chooseFromList<Board>(
        state.boards,
        (b) => `${b.name} (${b.id})`
    );

    if (!board) {
        console.log("Cancelled.");
        return;
    }

    await runBoardMenu(state, board);
}

async function handleDeleteBoard(state: AppState): Promise<void> {
    if (state.boards.length === 0) {
        console.log("No boards to delete.");
        await pause();
        return;
    }

    const board = await chooseFromList<Board>(
        state.boards,
        (b) => `${b.name} (${b.id})`
    );

    if (!board) {
        console.log("Cancelled.");
        return;
    }

    const ok = await confirm(
        `Are you sure you want to delete board "${board.name}" and all its data?`
    );
    if (!ok) {
        console.log("Deletion cancelled.");
        return;
    }

    const success = deleteBoard(state, board.id);
    if (success) {
        await saveState(state);
        console.log("Board deleted.");
    } else {
        console.log("Board not found. Nothing deleted.");
    }
}
