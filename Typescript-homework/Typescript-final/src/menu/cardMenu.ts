import type { AppState, Board, Card, List } from "../models/type";
import {
  question,
  askNonEmpty,
  askOptional,
  chooseFromList,
  pause,
  confirm,
} from "../utils/input";
import {
  addCardToList,
  findCardById,
  findListForCard,
  deleteCard,
  moveCardToList,
  reorderCardInList,
} from "../services/cardService";
import { saveState } from "../storage/filestorage";
import { isValidISODate } from "../utils/dates";

export async function runCardMenu(
  state: AppState,
  board: Board
): Promise<void> {
  let running = true;

  while (running) {
    console.log(`\n=== MANAGE CARDS (Board: ${board.name}) ===`);
    console.log("1) Add Card");
    console.log("2) View Card");
    console.log("3) Edit Card");
    console.log("4) Delete Card");
    console.log("5) Move Card to Another List");
    console.log("6) Reorder Card in List");
    console.log("7) Back");

    const choice = await question("Choose an option: ");

    switch (choice) {
      case "1":
        await handleAddCard(state, board);
        break;
      case "2":
        await handleViewCard(board);
        break;
      case "3":
        await handleEditCard(state, board);
        break;
      case "4":
        await handleDeleteCard(state, board);
        break;
      case "5":
        await handleMoveCard(state, board);
        break;
      case "6":
        await handleReorderCard(state, board);
        break;
      case "7":
        running = false;
        break;
      default:
        console.log("Invalid option. Please choose 1-7.");
    }
  }
}

async function handleAddCard(state: AppState, board: Board): Promise<void> {
  if (board.lists.length === 0) {
    console.log("You need to create a list first.");
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

  const title = await askNonEmpty("Enter card title: ");
  const description = (await askOptional("Enter description")) ?? "";
  const labelsStr = await question(
    "Enter labels separated by comma (or leave empty): "
  );
  const labels = labelsStr
    ? labelsStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  let dueDate: string | null = null;
  while (true) {
    const input = await question(
      "Enter due date (YYYY-MM-DD) or leave empty for none: "
    );
    if (input === "") {
      dueDate = null;
      break;
    }
    if (isValidISODate(input)) {
      dueDate = input;
      break;
    }
    console.log("Invalid date format. Use YYYY-MM-DD.");
  }

  const card = addCardToList(board, list.id, {
    title,
    description,
    labels,
    dueDate,
  });

  if (!card) {
    console.log("Failed to create card. List not found.");
    return;
  }

  await saveState(state);
  console.log(`Card created with id: ${card.id}`);
}

async function selectCard(board: Board): Promise<Card | null> {
  if (board.cards.length === 0) {
    console.log("No cards available.");
    await pause();
    return null;
  }

  const card = await chooseFromList<Card>(
    board.cards,
    (c) => {
      const list = findListForCard(board, c.id);
      const listName = list ? list.name : "No list";
      return `[${listName}] ${c.title} (${c.id})`;
    }
  );

  if (!card) {
    console.log("Cancelled.");
    return null;
  }

  return card;
}

async function handleViewCard(board: Board): Promise<void> {
  const card = await selectCard(board);
  if (!card) return;

  const list = findListForCard(board, card.id);
  console.log("\n=== CARD DETAILS ===");
  console.log(`Title: ${card.title}`);
  console.log(`ID: ${card.id}`);
  console.log(`List: ${list ? list.name : "Not in any list"}`);
  console.log(`Description: ${card.description || "(empty)"}`);
  console.log(
    `Labels: ${card.labels.length > 0 ? card.labels.join(", ") : "(none)"}`
  );
  console.log(`Created at: ${card.createdAt}`);
  console.log(`Due date: ${card.dueDate ?? "(none)"}`);

  await pause();
}

async function handleEditCard(state: AppState, board: Board): Promise<void> {
  const card = await selectCard(board);
  if (!card) return;

  let editing = true;
  while (editing) {
    console.log("\nEdit Card");
    console.log("1) Change title");
    console.log("2) Change description");
    console.log("3) Change labels");
    console.log("4) Change due date");
    console.log("5) Back");

    const choice = await question("Choose an option: ");

    switch (choice) {
      case "1": {
        const newTitle = await askNonEmpty("Enter new title: ");
        card.title = newTitle;
        await saveState(state);
        console.log("Title updated.");
        break;
      }
      case "2": {
        const newDesc =
          (await askOptional("Enter new description (leave empty to clear)")) ??
          "";
        card.description = newDesc;
        await saveState(state);
        console.log("Description updated.");
        break;
      }
      case "3": {
        const labelsStr = await question(
          "Enter new labels separated by comma (or leave empty to clear): "
        );
        const labels = labelsStr
          ? labelsStr
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
          : [];
        card.labels = labels;
        await saveState(state);
        console.log("Labels updated.");
        break;
      }
      case "4": {
        while (true) {
          const input = await question(
            "Enter new due date (YYYY-MM-DD) or leave empty to clear: "
          );
          if (input === "") {
            card.dueDate = null;
            break;
          }
          if (isValidISODate(input)) {
            card.dueDate = input;
            break;
          }
          console.log("Invalid date format. Use YYYY-MM-DD.");
        }
        await saveState(state);
        console.log("Due date updated.");
        break;
      }
      case "5":
        editing = false;
        break;
      default:
        console.log("Invalid option. Please choose 1-5.");
    }
  }
}

async function handleDeleteCard(state: AppState, board: Board): Promise<void> {
  const card = await selectCard(board);
  if (!card) return;

  const ok = await confirm(
    `Delete card "${card.title}" (id: ${card.id})? This cannot be undone.`
  );
  if (!ok) {
    console.log("Deletion cancelled.");
    return;
  }

  const success = deleteCard(board, card.id);
  if (success) {
    await saveState(state);
    console.log("Card deleted.");
  } else {
    console.log("Card not found.");
  }
}

async function handleMoveCard(state: AppState, board: Board): Promise<void> {
  const card = await selectCard(board);
  if (!card) return;

  const currentList = findListForCard(board, card.id);

  if (board.lists.length === 0) {
    console.log("No lists found.");
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

  if (currentList && currentList.id === list.id) {
    console.log("Card is already in that list.");
    return;
  }

  const success = moveCardToList(board, card.id, list.id);
  if (success) {
    await saveState(state);
    console.log("Card moved.");
  } else {
    console.log("Move failed.");
  }
}

async function handleReorderCard(state: AppState, board: Board): Promise<void> {
  if (board.lists.length === 0) {
    console.log("No lists available.");
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

  if (list.cardOrder.length === 0) {
    console.log("This list has no cards.");
    await pause();
    return;
  }

  console.log(`\nCurrent order in list "${list.name}":`);
  list.cardOrder.forEach((id, index) => {
    const card = findCardById(board, id);
    console.log(
      `${index + 1}) ${card ? card.title : "[missing card]"} (${id})`
    );
  });

  const fromIdxRaw = await question(
    "Select card position to move (1-based, or Enter to cancel): "
  );
  if (fromIdxRaw === "") {
    console.log("Cancelled.");
    return;
  }
  const fromIdx = Number(fromIdxRaw) - 1;
  if (
    !Number.isInteger(fromIdx) ||
    fromIdx < 0 ||
    fromIdx >= list.cardOrder.length
  ) {
    console.log("Invalid source position.");
    return;
  }

  const toIdxRaw = await question(
    `Enter new position (1-${list.cardOrder.length}): `
  );
  const toIdx = Number(toIdxRaw) - 1;
  if (
    !Number.isInteger(toIdx) ||
    toIdx < 0 ||
    toIdx >= list.cardOrder.length
  ) {
    console.log("Invalid target position.");
    return;
  }

  const success = reorderCardInList(board, list.id, fromIdx, toIdx);
  if (success) {
    await saveState(state);
    console.log("Card reordered.");
  } else {
    console.log("Reorder failed.");
  }
}
