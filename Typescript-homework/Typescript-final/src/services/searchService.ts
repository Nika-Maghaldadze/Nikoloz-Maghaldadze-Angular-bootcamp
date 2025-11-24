import type { Board, CardWithList } from "../models/type";
import { findListForCard } from "./cardService";

export function searchCardsByText(board: Board, text: string): CardWithList[] {
    const query = text.toLowerCase();
    if (!query) return [];

    const results: CardWithList[] = [];

    for (const card of board.cards) {
        const combined = (
            card.title +
            " " +
            (card.description ?? "")
        ).toLowerCase();

        if (combined.includes(query)) {
            const list = findListForCard(board, card.id);
            results.push({ card, list });
        }
    }

    return results;
}

export function searchCardsByLabel(
    board: Board,
    label: string
): CardWithList[] {
    const query = label.toLowerCase();
    if (!query) return [];

    const results: CardWithList[] = [];

    for (const card of board.cards) {
        const hasLabel = card.labels.some((l) => l.toLowerCase() === query);
        if (hasLabel) {
            const list = findListForCard(board, card.id);
            results.push({ card, list });
        }
    }

    return results;
}
