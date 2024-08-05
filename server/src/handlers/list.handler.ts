import type { Socket } from 'socket.io';

import { ListEvent } from '../common/enums/enums';
import { List } from '../data/models/list';
import { SocketHandler } from './socket.handler';
import { logger, LogLevel } from '../services/logger';

class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.DELETE, this.deleteList.bind(this));
    socket.on(ListEvent.RENAME, this.renameList.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const lists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      lists,
      sourceIndex,
      destinationIndex,
    );
    this.db.setData(reorderedLists);
    this.updateLists();
  }

  private createList(name: string): void {
    const lists = this.db.getData();
    const newList = new List(name);
    logger.log(LogLevel.Info, `List created: ${JSON.stringify(newList)}`);
    this.db.setData(lists.concat(newList));
    this.updateLists();
  }
  private deleteList(listId: string): void {
    const lists = this.db.getData();
    const index = lists.findIndex((list) => list.id === listId);
    if (index !== -1) {
      logger.log(LogLevel.Info, `List deleted: ${listId}`);
      lists.splice(index, 1);
      this.updateLists();
    }
  }
  private renameList(data: { listId: string; newName: string }): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === data.listId);
    if (list) {
      list.name = data.newName;
      logger.log(LogLevel.Info, `List renamed: ${JSON.stringify(data)}`);
      this.updateLists();
    }
  }
}

export { ListHandler };
