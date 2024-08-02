export interface Card {
    id: string;
    name: string;
    description: string;
    listId: string;
    createdAt?: string;
  }
  
  export interface List {
    id: string;
    name: string;
    cards: Card[];
  }
  