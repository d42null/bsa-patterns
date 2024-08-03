import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.RENAME, this.changeCardText.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeCardText.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }
  private deleteCard(cardId: string) {
    const lists = this.db.getData();
    lists.forEach((list) => {
      const index = list.cards.findIndex((card) => card.id === cardId);
      if (index !== -1) list.cards.splice(index, 1);
    });
    this.updateLists();
  }
  private changeCardText(data: {
    cardId: string;
    newText: string;
    isDescription?: boolean;
  }) {
    const lists = this.db.getData();
    lists.forEach((list) => {
      const card = list.cards.find((card) => card.id === data.cardId);
      if (card)
        if (data.isDescription) card.description = data.newText;
        else card.name = data.newText;
    });
    this.updateLists();
  }
}

export { CardHandler };
