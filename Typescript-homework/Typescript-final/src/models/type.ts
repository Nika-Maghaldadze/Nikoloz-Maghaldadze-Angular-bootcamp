export type ID = string;

export interface Card {
  id: ID;
  title: string;
  description: string;
  labels: string[];
  createdAt: string;
  dueDate: string | null;
}

export interface List {
  id: ID;
  name: string;
  cardOrder: ID[];
}

export interface Board {
  id: ID;
  name: string;
  lists: List[];
  cards: Card[];
}

export interface AppState {
  boards: Board[];
}

export interface CardWithList {
  card: Card;
  list: List | null;
}
