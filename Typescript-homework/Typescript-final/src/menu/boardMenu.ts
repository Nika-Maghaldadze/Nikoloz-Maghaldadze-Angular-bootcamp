import type { AppState, Board, Card, List } from "../models/type";
import { question, pause } from "../utils/input";
import { runListMenu } from "./listMenu";
import { runCardMenu } from "./cardMenu";
import { runSearchMenu } from "./searchMenu";
import { findListForCard } from "../services/cardService";

export async function runBoardMenu(
  state: AppState,
  board: Board
): Promise<void> {
  let running = true;

  while (running) {
    console.log(`\n=== BOARD: ${board.name} (${board.id}) ===`);
    console.log("1) Show Board Details");
    console.log("2) Manage Lists");
    console.log("3) Manage Cards");
    console.log("4) Search");
    console.log("5) Back");

    const choice = await question("Choose an option: ");

    switch (choice) {
      case "1":
        await showBoardDetails(board);
        break;
      case "2":
        await runListMenu(state, board);
        break;
      case "3":
        await runCardMenu(state, board);
        break;
      case "4":
        await runSearchMenu(state, board);
        break;
      case "5":
        running = false;
        break;
      default:
        console.log("Invalid option. Please choose 1-5.");
    }
  }
}

async function showBoardDetails(board: Board): Promise<void> {
  console.log(`\nBoard: ${board.name}`);
  if (board.lists.length === 0) {
    console.log("(No lists yet)");
    await pause();
    return;
  }

  for (const list of board.lists) {
    console.log(`\nList: ${list.name} (id: ${list.id})`);

    if (list.cardOrder.length === 0) {
      console.log("  (No cards)");
      continue;
    }

    list.cardOrder.forEach((cardId, index) => {
      const card: Card | undefined = board.cards.find((c) => c.id === cardId);
      if (!card) {
        console.log(`  ${index + 1}. [missing card: ${cardId}]`);
        return;
      }
      console.log(
        `  ${index + 1}. ${card.title} (id: ${card.id}${
          card.dueDate ? `, due: ${card.dueDate}` : ""
        })`
      );
    });
  }

  await pause();
}