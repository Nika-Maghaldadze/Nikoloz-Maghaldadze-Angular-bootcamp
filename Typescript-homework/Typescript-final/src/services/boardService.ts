import type { AppState, Board, ID } from "../models/type";
import { generateId } from "../utils/id";

export function createBoard(state: AppState, name: string): Board {
  const board: Board = {
    id: generateId("board_"),
    name,
    lists: [],
    cards: [],
  };
  state.boards.push(board);
  return board;
}

export function deleteBoard(state: AppState, boardId: ID): boolean {
  const index = state.boards.findIndex((b) => {
    b.id === boardId
  });
  if (index === -1) {
    return false;
  }
  state.boards.splice(index, 1);
  return true;
}

export function findBoardById(state: AppState, boardId: ID): Board | undefined {
  return state.boards.find((b) => {
    b.id === boardId
  });
}
