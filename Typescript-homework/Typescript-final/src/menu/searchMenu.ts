import type { AppState, Board, CardWithList } from "../models/type";
import { question, askNonEmpty, pause } from "../utils/input";
import {
    searchCardsByText,
    searchCardsByLabel,
} from "../services/searchService";

export async function runSearchMenu(
    _state: AppState,
    board: Board
): Promise<void> {
    let running = true;

    while (running) {
        console.log(`\n=== SEARCH (Board: ${board.name}) ===`);
        console.log("1) Search by text");
        console.log("2) Search by label");
        console.log("3) Back");

        const choice = await question("Choose an option: ");

        switch (choice) {
            case "1":
                await handleSearchByText(board);
                break;
            case "2":
                await handleSearchByLabel(board);
                break;
            case "3":
                running = false;
                break;
            default:
                console.log("Invalid option. Please choose 1-3.");
        }
    }
}

async function handleSearchByText(board: Board): Promise<void> {
    const text = await askNonEmpty(
        "Enter text to search in title/description: "
    );
    const results = searchCardsByText(board, text);
    printSearchResults(results);
    await pause();
}

async function handleSearchByLabel(board: Board): Promise<void> {
    const label = await askNonEmpty("Enter label to search: ");
    const results = searchCardsByLabel(board, label);
    printSearchResults(results);
    await pause();
}

function printSearchResults(results: CardWithList[]): void {
    console.log("\n=== SEARCH RESULTS ===");
    if (results.length === 0) {
        console.log("No matching cards found.");
        return;
    }

    results.forEach((r, index) => {
        const listName = r.list ? r.list.name : "No list";
        console.log(
            `${index + 1}) [${listName}] ${r.card.title} (id: ${r.card.id})`
        );
    });
}
