import type { Board, List, ID } from "../models/type";
import { generateId } from "../utils/id";

export function addList(board: Board, name: string): List {
    const list: List = {
        id: generateId("list_"),
        name,
        cardOrder: [],
    };
    board.lists.push(list);
    return list;
}

export function renameList(board: Board, listId: ID, newName: string): boolean {
    const list = board.lists.find((l) => {
        l.id === listId;
    });
    if (!list) {
        return false;
    }
    list.name = newName;
    return true;
}

export function deleteList(board: Board, listId: ID): boolean {
    const index = board.lists.findIndex((l) => {
        l.id === listId;
    });
    if (index === -1) {
        return false;
    }

    const list = board.lists[index];

    const idsToRemove = new Set(list.cardOrder);
    board.cards = board.cards.filter((c) => {
        !idsToRemove.has(c.id);
    });

    board.lists.splice(index, 1);

    return true;
}
