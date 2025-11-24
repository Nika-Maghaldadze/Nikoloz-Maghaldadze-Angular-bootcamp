import type { AppState, Board, List } from "../models/type";
import {
  question,
  askNonEmpty,
  chooseFromList,
  pause,
  confirm,
} from "../utils/input";
import { addList, renameList, deleteList } from "../services/listService";
import { saveState } from "../storage/filestorage";

export async function runListMenu(
  state: AppState,
  board: Board
): Promise<void> {
  let running = true;

  while (running) {
    console.log(`\n=== MANAGE LISTS (Board: ${board.name}) ===`);
    console.log("1) Add List");
    console.log("2) Rename List");
    console.log("3) Delete List");
    console.log("4) Back");

    const choice = await question("Choose an option: ");

    switch (choice) {
      case "1":
        await handleAddList(state, board);
        break;
      case "2":
        await handleRenameList(state, board);
        break;
      case "3":
        await handleDeleteList(state, board);
        break;
      case "4":
        running = false;
        break;
      default:
        console.log("Invalid option. Please choose 1-4.");
    }
  }
}

async function handleAddList(state: AppState, board: Board): Promise<void> {
  const name = await askNonEmpty("Enter list name: ");
  const list = addList(board, name);
  await saveState(state);
  console.log(`List created with id: ${list.id}`);
}

async function handleRenameList(state: AppState, board: Board): Promise<void> {
  if (board.lists.length === 0) {
    console.log("No lists to rename.");
    await pause();
    return;
  }

  const list = await chooseFromList<List>(
    board.lists,
    (l) => `${l.name} (${l.id})`
  );

  if (!list) {
    console.log("Cancelled.");
    return;
  }

  const newName = await askNonEmpty("Enter new list name: ");
  const ok = renameList(board, list.id, newName);
  if (ok) {
    await saveState(state);
    console.log("List renamed.");
  } else {
    console.log("List not found.");
  }
}

async function handleDeleteList(state: AppState, board: Board): Promise<void> {
  if (board.lists.length === 0) {
    console.log("No lists to delete.");
    await pause();
    return;
  }

  const list = await chooseFromList<List>(
    board.lists,
    (l) => `${l.name} (${l.id})`
  );

  if (!list) {
    console.log("Cancelled.");
    return;
  }

  const okConfirm = await confirm(
    `Delete list "${list.name}" and all its cards?`
  );
  if (!okConfirm) {
    console.log("Deletion cancelled.");
    return;
  }

  const ok = deleteList(board, list.id);
  if (ok) {
    await saveState(state);
    console.log("List deleted.");
  } else {
    console.log("List not found.");
  }
}
