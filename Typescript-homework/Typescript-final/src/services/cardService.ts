import type { Board, Card, ID, List } from "../models/type";
import { generateId } from "../utils/id";
import { moveItemInArray } from "../utils/arrays";

export function addCardToList(
    board: Board,
    listId: ID,
    data: {
        title: string;
        description?: string;
        labels?: string[];
        dueDate?: string | null;
    }
): Card | null {
    const list = board.lists.find((l) => l.id === listId);
    if (!list) {
        return null;
    }

    const card: Card = {
        id: generateId("card_"),
        title: data.title,
        description: data.description ?? "",
        labels: data.labels ?? [],
        createdAt: new Date().toISOString(),
        dueDate: data.dueDate ?? null,
    };

    board.cards.push(card);
    list.cardOrder.push(card.id);

    return card;
}

export function findCardById(board: Board, cardId: ID): Card | undefined {
    return board.cards.find((c) => {
        c.id === cardId;
    });
}

export function findListForCard(board: Board, cardId: ID): List | null {
    for (const list of board.lists) {
        if (list.cardOrder.includes(cardId)) {
            return list;
        }
    }
    return null;
}

export function deleteCard(board: Board, cardId: ID): boolean {
    const cardIndex = board.cards.findIndex((c) => {
        c.id === cardId;
    });
    if (cardIndex === -1) {
        return false;
    }

    board.cards.splice(cardIndex, 1);

    for (const list of board.lists) {
        const idx = list.cardOrder.indexOf(cardId);
        if (idx !== -1) {
            list.cardOrder.splice(idx, 1);
            break;
        }
    }
    return true;
}

export function moveCardToList(
    board: Board,
    cardId: ID,
    targetListId: ID
): boolean {
    const card = findCardById(board, cardId);
    if (!card) {
        return false;
    }
    const currentList = findListForCard(board, cardId);
    const targetList = board.lists.find((l) => {
        l.id === targetListId;
    });
    if (!targetList) {
        return false;
    }
    if (currentList) {
        currentList.cardOrder = currentList.cardOrder.filter((id) => {
            id !== cardId;
        });
    }
    targetList.cardOrder.push(cardId);
    return true;
}

export function reorderCardInList(
    board: Board,
    listId: ID,
    fromIndex: number,
    toIndex: number
): boolean {
    const list = board.lists.find((l) => l.id === listId);
    if (!list) {
        return false;
    }
    if (
        fromIndex < 0 ||
        fromIndex >= list.cardOrder.length ||
        toIndex < 0 ||
        toIndex >= list.cardOrder.length
    ) {
        return false;
    }
    list.cardOrder = moveItemInArray(list.cardOrder, fromIndex, toIndex);
    return true;
}
